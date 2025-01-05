const jwt = require("jsonwebtoken");
const User = require("../models/user.js");




const checkIsUserAuthenticated = async(req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {

        token = authorization.split(" ")[1];
        console.log("qqqqqq");
        const { userID } = jwt.verify(token, "pleaseSubscribe");
        console.log(userID, "heeeeerrree");

        req.user = await User.findById(userID).select("--password");
        console.log(req.user, "user.......");
        next();
    } else {
        res.status(401).json({ message: "You are not authenticated" });
    }
};
module.exports = checkIsUserAuthenticated;