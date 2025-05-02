const express = require('express');
const { addProperty, getPropertyById, getAllProperty, userProperty } = require('../controllers/propertyController');
const Appointment = require('../models/Appointment');
const router = express.Router();

// Add Property Route
router.post('/add-property', addProperty);
router.get('/', getAllProperty);
router.get('/:id', getPropertyById);



module.exports = router;

// Get Properties by User ID Route
router.get('/user/:userId', userProperty);

router.post('/:id/appointment', async(req, res) => {
    try {
        const { buyerId, sellerId, date, time, location } = req.body;
        const propertyId = req.params.id;

        if (!buyerId || !sellerId || !date || !time || !location) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newAppointment = new Appointment({
            propertyId,
            buyerId,
            sellerId,
            date,
            time,
            location,
            status: 'Scheduled',
        });

        await newAppointment.save();

        res.status(201).json({
            message: 'Appointment scheduled successfully.',
            appointment: newAppointment,
        });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;