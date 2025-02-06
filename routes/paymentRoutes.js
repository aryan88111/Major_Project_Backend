const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Payment = require('../models/Payment');
const Property = require('../models/property');
const auth = require('../middlewares/authMiddleware');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * Generate a unique receipt ID
 * @param {string} propertyId - The property ID
 * @returns {string} A unique receipt ID
 */
function generateReceiptId(propertyId) {
    // Take first 8 chars of property ID and add timestamp
    const shortPropId = propertyId.toString().slice(-8);
    const timestamp = Date.now().toString().slice(-8);
    return `rcpt_${shortPropId}_${timestamp}`;
}

/**
 * @route   POST /api/payments/create-order
 * @desc    Create a new payment order
 * @access  Private
 */
router.post('/create-order', auth, async(req, res) => {
    let propertyId = null;
    let property = null;

    try {
        propertyId = req.body.propertyId;
        console.log('Creating order for property:', propertyId);
        console.log('User ID:', req.user.id);

        if (!propertyId) {
            throw new Error('Property ID is required');
        }

        // Get property details
        property = await Property.findById(propertyId);
        console.log('Found property:', property);

        if (!property) {
            throw new Error('Property not found');
        }

        // Validate property status
        if (property.status !== 'active') {
            throw new Error(`Property is not available for purchase (status: ${property.status})`);
        }

        // Validate buyer is not the owner
        if (property.owner.toString() === req.user.id) {
            throw new Error('Cannot purchase your own property');
        }

        // Calculate amount in paise (smallest currency unit)
        const amountInPaise = Math.round(property.price * 100);
        if (amountInPaise <= 0) {
            throw new Error('Invalid property price');
        }
        console.log('Amount in paise:', amountInPaise);

        // Generate a unique receipt ID (max 40 chars)
        const receiptId = generateReceiptId(propertyId);
        console.log('Generated receipt ID:', receiptId);

        try {
            // Create Razorpay order with promise
            const order = await new Promise((resolve, reject) => {
                razorpay.orders.create({
                    amount: amountInPaise,
                    currency: 'INR',
                    receipt: receiptId,
                    notes: {
                        propertyId: propertyId,
                        buyerId: req.user.id
                    }
                }, (err, order) => {
                    if (err) {
                        console.error('Razorpay order creation error:', err);
                        reject(err);
                    } else {
                        resolve(order);
                    }
                });
            });

            console.log('Razorpay order created:', order);

            if (!order || !order.id) {
                throw new Error('Failed to create Razorpay order');
            }

            // Create payment record
            const payment = new Payment({
                property: propertyId,
                buyer: req.user.id,
                seller: property.owner,
                amount: property.price,
                razorpayOrderId: order.id,
                status: 'pending'
            });

            await payment.save();
            console.log('Payment record created:', payment);

            // Update property status to pending
            property.status = 'pending';
            await property.save();
            console.log('Property status updated to pending');

            res.json({
                success: true,
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                paymentId: payment._id
            });

        } catch (razorpayError) {
            console.error('Razorpay error:', razorpayError);
            // Include the actual error message from Razorpay
            // const errorMessage = razorpayError.error ? .description || razorpayError.message || 'Failed to create Razorpay order';
            // throw new Error(errorMessage);
        }

    } catch (error) {
        console.error('Create order error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code
        });

        // Revert property status if needed
        if (property && property.status === 'pending') {
            try {
                property.status = 'active';
                await property.save();
                console.log('Property status reverted to active');
            } catch (revertError) {
                console.error('Error reverting property status:', revertError);
            }
        }

        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create payment order',
            error: process.env.NODE_ENV === 'development' ? {
                stack: error.stack,
                code: error.code,
                statusCode: error.statusCode,
                error: error.error
            } : undefined
        });
    }
});

/**
 * @route   POST /api/payments/verify
 * @desc    Verify payment signature and update status
 * @access  Private
 */
router.post('/verify', auth, async(req, res) => {
    try {
        console.log('Payment verification request received:', req.body);

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            throw new Error('Missing required payment parameters');
        }

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest('hex');

        console.log('Signature verification:', {
            received: razorpay_signature,
            expected: expectedSign
        });

        if (razorpay_signature !== expectedSign) {
            throw new Error('Invalid payment signature');
        }

        // Find payment
        const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
        console.log('Found payment:', payment);

        if (!payment) {
            throw new Error('Payment record not found');
        }

        // Check if payment is already completed
        if (payment.status === 'completed') {
            throw new Error('Payment already processed');
        }

        // Verify payment status with Razorpay
        const razorpayPayment = await razorpay.payments.fetch(razorpay_payment_id);
        console.log('Razorpay payment status:', razorpayPayment.status);

        if (razorpayPayment.status !== 'captured') {
            throw new Error('Payment not captured by Razorpay');
        }

        // Find property
        const property = await Property.findById(payment.property);
        console.log('Found property:', property);

        if (!property) {
            throw new Error('Property not found');
        }

        // Validate property status
        if (property.status !== 'pending') {
            throw new Error('Property is not in pending state');
        }

        // Update payment status
        payment.razorpayPaymentId = razorpay_payment_id;
        payment.status = 'completed';
        await payment.save();
        console.log('Payment status updated to completed');

        // Update property details
        property.status = 'sold';
        property.soldTo = payment.buyer;
        property.soldAt = new Date();
        property.soldPrice = payment.amount;
        await property.save();
        console.log('Property status updated to sold');

        res.json({
            success: true,
            message: 'Payment verified successfully'
        });

    } catch (error) {
        console.error('Payment verification error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        res.status(500).json({
            success: false,
            message: error.message || 'Payment verification failed',
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

/**
 * @route   GET /api/payments/history
 * @desc    Get user's payment history
 * @access  Private
 */
router.get('/history', auth, async(req, res) => {
    try {
        const payments = await Payment.find({
                $or: [{ buyer: req.user.id }, { seller: req.user.id }]
            })
            .populate('property', 'title price images')
            .populate('buyer', 'firstName lastName email')
            .populate('seller', 'firstName lastName email')
            .sort({ createdAt: -1 });

        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route   GET /api/payments/:id
 * @desc    Get payment details by ID
 * @access  Private
 */
router.get('/:id', auth, async(req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('property', 'title price images')
            .populate('buyer', 'firstName lastName email')
            .populate('seller', 'firstName lastName email');

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Verify user is buyer or seller
        if (payment.buyer.toString() !== req.user.id &&
            payment.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view this payment' });
        }

        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;