// Import required modules
const bcryptjs = require('bcryptjs'); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JSON Web Tokens (JWT)
const User = require('../models/user.js'); // Import the User model

// Function to handle user registration
exports.userRegister = async(req, res) => {
    // Check if the user already exists in the database
    const data = await User.findOne({ email: req.body.email });
    if (data) {
        // If user exists, return a message
        return res.send('User  Already present In DataBase');
    } else {
        // If user does not exist, hash the password
        const NewPassword = await bcryptjs.hash(req.body.password, 10);
        // Create a new user object with the provided details
        const userData = User({
            name: req.body.name,
            email: req.body.email,
            password: NewPassword // Store the hashed password
        });
        // Save the user to the database
        await userData.save();
        // Return a success message
        return res.status(200).json("Successfully Created ");
    }
};

// Function to handle user login
exports.userLogin = async(req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;
    // Find the user in the database by email
    const data = await User.findOne({ email: req.body.email });
    if (!data) {
        // If user is not found, return an error message
        return res.status(400).json({
            message: "User  Not Found"
        });
    } else {
        // Check if both email and password are provided
        if (email && password) {
            // Verify the email and password
            if (email === data.email && await bcryptjs.compare(password, data.password)) {
                // If credentials are valid, generate a JWT token
                const token = jwt.sign({ userID: data._id }, "aryangautam", {
                    expiresIn: "2d", // Token expires in 2 days
                });
                // Return a success message with the token and user's name
                return res.status(200).json({
                    message: "Login SuccessFul",
                    token: token,
                    name: data.name
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