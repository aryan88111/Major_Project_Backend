// Import required modules
const bcryptjs = require('bcryptjs'); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JSON Web Tokens (JWT)
const User = require('../models/user.js'); // Import the User model

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
            profilePicture: user.profilePicture
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
    const data = await User.findOne({ email: email });
    if (data) {
        //generate token
        const secret_key = data._id + "pleaseSubscribe";
        console.log(secret_key + "scccccc");
        const token = jwt.sign({ userID: data._id }, secret_key, {
            expiresIn: '10m'
        });
        const link = `http://localhost:3000/forget-password/${data._id}/${token}`;
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            logger: true,
            secureConnection: false,
            auth: {
                user: "markbaba88111@gmail.com",
                pass: "ruko abev qgwm hfeu",
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

                    return res.status(400).json({ message: "Password changed" });
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