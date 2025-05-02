// Import required modules
const bcryptjs = require('bcryptjs'); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JSON Web Tokens (JWT)
const User = require('../models/user.js'); // Import the User model
const Razorpay = require('razorpay'); // Razorpay for payment integration
const crypto = require('crypto');
const { log } = require('console');

const nodemailer = require("nodemailer");


// Initialize Razorpay instance (use your Razorpay API keys)
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_Z6d3UK2fNjcswp',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'X3fEAvpXPYFFQPK09aURCxkZ'
});
exports.createSubscription = async(req, res) => {
    console.log("API called to create subscription!"); // Add this to debug
    try {
        const { userEmail, userId, userName } = req.body; // Get user details from frontend
        const planId = "plan_QAWZZirWIHs8me"; // Predefined Razorpay plan ID
        const totalCount = req.body.total_count || 12; // Number of billing cycles (1 year)

        console.log(userEmail, userId, userName);

        // Create Razorpay subscription
        const subscription = await razorpay.subscriptions.create({
            plan_id: planId,
            total_count: totalCount,
            customer_notify: 1,
            notes: {
                premium_membership: "Property Listing Website Premium Membership",
                user_id: userId, // Include userId for tracking
                user_name: userName,
                user_email: userEmail,
            },
        });

        // Send subscription details to the frontend
        res.status(201).json({
            message: "Subscription created successfully",
            subscription,
        });
    } catch (error) {
        console.error("Error creating subscription:", error);

        // Send error response
        res.status(500).json({
            message: "Failed to create subscription due to server error",
            error: error.message,
        });
    }
};
exports.verifyPayment = async(req, res) => {
    try {
        const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature, userId } = req.body;

        // Generate signature for verification
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'X3fEAvpXPYFFQPK09aURCxkZ')
            .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            // Find user by ID and update subscription status
            const user = await User.findById(userId);
            if (user) {
                user.subscription = true; // Activate subscription
                user.role = user.role; // Keep existing role (e.g., 'Seller')
                await user.save();

                res.status(200).json({ message: "Payment verified and subscription activated!" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } else {
            res.status(400).json({ message: "Payment verification failed due to signature mismatch" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Payment verification process encountered an error" });
    }
};


// Route to handle subscription creation
// exports.createSubscription = async(req, res) => {
//     try {
//         const userEmail = localStorage.getItem('userEmail');
//         const userId = localStorage.getItem('userId');
//         const userName = localStorage.getItem('userName');
//         // Get user details from the request
//         const planId = "plan_QAWZZirWIHs8me"; // Predefined Razorpay plan ID
//         const totalCount = req.body.total_count || 12; // Number of billing cycles (1 year)

//         // Create Razorpay subscription with user data and plan details
//         const subscription = await razorpay.subscriptions.create({
//             plan_id: planId,
//             total_count: totalCount,
//             customer_notify: 1,
//             notes: {
//                 premium_membership: "Property Listing Website Premium Membership",
//                 user_id: userId, // Include userId for backend tracking
//                 user_name: userName,
//                 user_email: userEmail,
//             },
//         });

//         // Send subscription details back to the frontend
//         res.status(201).json({
//             message: "Subscription created successfully",
//             subscription,
//         });
//     } catch (error) {
//         console.error("Error creating subscription:", error);

//         // Handle Razorpay API errors gracefully
//         const errorMessage = error || "Failed to create subscription due to server error.";
//         res.status(500).json({
//             message: errorMessage,
//             error: error,
//         });
//     }
// };
// Route to verify payment signature after successful payment
// exports.verifyPayment = async(req, res) => {
//     try {
//         const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body; // Include userId from frontend
//         const userId = localStorage.getItem('userId');
//         // Generate signature for verification using Razorpay key secret
//         const generated_signature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'X3fEAvpXPYFFQPK09aURCxkZ')
//             .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
//             .digest("hex");

//         // Verify if the generated signature matches the one received from Razorpay
//         if (generated_signature === razorpay_signature) {
//             // Find user by ID and update their subscription status while keeping role as 'Seller'
//             const user = await User.findById(userId);
//             if (user) {
//                 user.subscription = true; // Activate the user's subscription
//                 user.role = user.role; // Keep existing role (like 'Seller')
//                 await user.save();

//                 res.status(200).json({ message: "Payment verified and subscription activated!" });
//             } else {
//                 res.status(404).json({ message: "User not found" });
//             }
//         } else {
//             res.status(400).json({ message: "Payment verification failed due to signature mismatch" });
//         }
//     } catch (error) {
//         console.error("Error verifying payment:", error);

//         // Respond with a generic error message
//         res.status(500).json({ message: "Payment verification process encountered an error" });
//     }
// };

// Function to handle user registration
exports.userRegister = async(req, res) => {
    // Check if the user already exists in the database

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        // If user exists, return a message
        return res.send('User  Already present In DataBase');
    } else {
        // If user does not exist, hash the password
        const NewPassword = await bcryptjs.hash(req.body.password, 10);
        // Create a new user object with the provided details
        console.log(NewPassword, "aaaaaaaaaaaaaaaa");
        user = User({
            // Plain password - will be hashed by pre-save middleware
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            password: NewPassword, // Store the hashed password
            role: req.body.role,
            profilePicture: req.body.profilePicture
        });
        // Save the user to the database
        await user.save();
        console.log("yyyyyyyyyyyyyyyyyyyy");


        const token = jwt.sign({ userId: user._id },
            process.env.JWT_SECRET || 'pleaseSubscribe', { expiresIn: '24h' }
        );


        // Return user data (excluding password)
        const userData = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            phoneNo: user.phoneNo,
            profilePicture: user.profilePicture,
            subscription: user.subscription
        };

        // Return a success message
        res.status(201).json({
            token,
            user: userData
        });
    }
};

// Function to handle user login
exports.userLogin = async(req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;
    // Find the user in the database by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        // If user is not found, return an error message
        return res.status(400).json({
            message: "User  Not Found"
        });
    } else {
        // Check if both email and password are provided
        if (email && password) {
            // Verify the email and password
            if (email === user.email && await bcryptjs.compare(password, user.password)) {
                // If credentials are valid, generate a JWT token
                const token = jwt.sign({ userID: user._id }, "pleaseSubscribe", {
                    expiresIn: "2d", // Token expires in 2 days
                });
                // Return user data (excluding password)
                const userData = {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    phoneNo: user.phoneNo,
                    userSubscription: user.subscription,
                    profilePicture: user.profilePicture
                };


                // Return a success message with the token and user's name
                return res.status(200).json({
                    message: "Login SuccessFul",
                    token: token,
                    user: userData
                });
            } else {
                // If credentials are invalid, return an error message
                return res.status(400).json({
                    message: "Invalid Credentials"
                });
            }
        } else {
            // If any field is missing, return an error message
            return res.status(400).json({
                message: "All Fields are Require"
            });
        }
    }
};

exports.changePassword = async(req, res) => {


    const { newPassword, confirmPassword } = req.body;
    if (newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
            const hashPassword = await bcryptjs.hash(newPassword, 10);
            // console.log(req.data._id);

            await User.findByIdAndUpdate(req.user._id, {
                password: hashPassword

            })
            return res.status(200).json({ message: "password changed" });
        } else {
            return res.status(400).json({
                message: "new Password And confirm Password Are not Matched"
            })

        }

    } else {
        return res.status(400).json({
            message: "All Fields Are Required"
        })

    }

};

exports.forgetPassword = async(req, res) => {
    const { email } = req.body;
    console.log(email, "lllll");
    const data = await User.findOne({ email: email });
    if (data) {
        //generate token
        const secret_key = data._id + "pleaseSubscribe";
        console.log(secret_key + "scccccc");
        const token = jwt.sign({ userID: data._id }, secret_key, {
            expiresIn: '10m'
        });
        const link = `http://localhost:5173/api/users/forget-password/${data._id}/${token}`;
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            logger: true,
            secureConnection: false,
            auth: {
                user: "hackerbhaiya5@gmail.com",
                pass: "ljcd phkv kpvp qpnf",
            },
            tls: {
                rejectUnAuthorized: true

            }
        });
        const mailOptions = {

            from: process.env.Email,
            to: email,
            subject: 'Password Reset Request Link',
            text: `${link}`


        };

        transport.sendMail(mailOptions, (erroe, info) => {
            if (erroe) {
                return res.status(400).json({ message: erroe + info });
            }

            return res.status(200).json({ message: "Email sent" });
        });

    } else {
        return res.status(400).json({ message: "Email Not Found" });
    }


};

exports.forgetPasswordEmail = async(req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const { id, token } = req.params;
    console.log("API  K andar hu m ");
    if (newPassword && confirmPassword && id && token) {

        if (newPassword === confirmPassword) {

            const isUser = await User.findById(id);
            console.log(isUser);
            console.log("aggaya m yaha pr");
            //token verify
            const secret_key = isUser._id + "pleaseSubscribe";
            // console.log("ram ji ka vand" + secret_key + " " + token);
            const isValid = await jwt.verify(token, secret_key
                // async(err, decoded) => {
                // if (err) {
                //     console.log("yeh hai error" + err + "yyy" + decoded);
                // }
                // Use decoded token
                // }
            );
            console.log(isValid);
            if (isValid) {
                // hashing
                console.log("valid ho gaya m");
                const hashPassword = await bcryptjs.hash(newPassword, 10);
                const isSuccess = await User.findByIdAndUpdate(isUser._id, {
                    $set: {
                        password: hashPassword
                    },
                });
                if (isSuccess) {

                    return res.status(200).json({ message: "Password changed" });
                } else {
                    return res.status(400).json({ message: "Password Not changed" })

                }

            } else {
                return res.status(400).json({ message: "Link Expired" })

            }


        } else {
            return res.status(400).json({ message: "Password Not Matched" })

        }


    } else {
        return res.status(400).json({ message: "All Fields Are required" })

    }

};


// Find User by ID

exports.findUserById = async(req, res) => {

    const { id } = req.params; // Get the user ID from the request parameters


    try {

        const user = await User.findById(id); // Find user by ID


        if (!user) {

            return res.status(404).json({ message: 'User  not found' });

        }


        res.status(200).json(user); // Respond with the user data

    } catch (error) {

        console.error(error);

        res.status(500).json({ message: 'Error retrieving user', error: error.message });

    }

};



// const bcryptjs = require('bcryptjs');
// const jwt = require("jsonwebtoken");
// const User = require('../models/user.js');


// exports.userRegister = async(req, res) => {


//     const data = await User.findOne({ email: req.body.email });
//     if (data) {
//         return res.send('User Already present In DataBase')
//     } else {
//         // const { Name, Email, Password } = req.body;
//         const NewPassword = await bcryptjs.hash(req.body.password, 10);
//         const userData = User({
//             name: req.body.name,
//             email: req.body.email,
//             password: NewPassword
//         })
//         await userData.save();
//         return res.status(200).json("Successfully Created ");

//     }


// };



// exports.userLogin = async(req, res) => {
//     const { email, password } = req.body;
//     const data = await User.findOne({ email: req.body.email });
//     if (!data) {
//         return res.status(400).json({
//             message: "User Not Found"
//         })
//     } else {
//         if (email && password) {

//             if (email === data.email && await bcryptjs.compare(password, data.password)) {

//                 const token = jwt.sign({ userID: data._id }, "aryangautam", {
//                     expiresIn: "2d",
//                 });
//                 return res.status(200).json({
//                     message: "Login SuccessFul",
//                     token: token,
//                     name: data.name
//                 });
//             } else {
//                 return res.status(400).json({
//                     message: "Invalid Credentials"
//                 })
//             }

//         } else {
//             return res.status(400).json({
//                 message: "All Fields are Require"
//             })
//         }
//     }

// };