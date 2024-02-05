const jwt = require("jsonwebtoken");
const User = require('../models/User');


exports.auth = (req, res, next) => {
   try {

        const token = req.body.token

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "missing token"
            })
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode;
            next();
        }
        catch (err) {
            return res.status(401).json({
                success: false,
                message: "decoding token error"
            })
        }

    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "overall authentication error",
            err
        })
    }
}


exports.isAdmin = async (req, res, next) => {
   
    const user = await User.findById(req.user._id);
    try {
        if (user.role !== 1) {
            return res.status(401).json({
                success: false,
                message: "not a admin "
            })

        }
         next();
       
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "overall isAdmin error"
        })
    }
}