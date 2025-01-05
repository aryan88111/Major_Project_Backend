// Import the Express framework to create a router
const express = require('express');
// Create a new router instance
const router = express.Router();

// Import bcryptjs for password hashing
const bcryptjs = require('bcryptjs');

// Import jsonwebtoken for generating and verifying JWT tokens
const jwt = require("jsonwebtoken");

// Import the User model for database interactions
const User = require('../models/user.js');

// Import the userController functions for handling login and registration
const {
    userLogin,
    userRegister,
    forgetPasswordEmail,
    changePassword,
    forgetPassword,
    findUserById
} = require("../controllers/userController.js");

// Import the middleware to check if a user is authenticated
const checkIsUserAuthenticated = require('../middlewares/authMiddleware');

// Define a POST route for user registration
// Calls the userRegister function from the userController
router.post('/register', userRegister);

// Define a POST route for user login
// Calls the userLogin function from the userController
router.post("/login", userLogin);


router.post("/change-password", checkIsUserAuthenticated, changePassword);


router.post("/forget-password", forgetPassword)


router.post("/forget-password/:id/:token", forgetPasswordEmail);
// Find User by ID Route

router.get('/:id', findUserById);


// Export the router to be used in other parts of the application
module.exports = router;