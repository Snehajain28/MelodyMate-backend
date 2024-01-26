const User = require('../models/User');
const jwt = require('jsonwebtoken')
const mailSender = require('../utils/mailSender');

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "enter email to reset"
            })
        }
        const existing = await User.findOne({ email });
        if (!existing) {
            return res.status(400).json({
                message: "email not found for reset"
            })
        }

        const token = crypto.randomUUID

        const updateDetails = await User.findByIdAndUpdate({ email: email }, { token: token, resetPassword: Date.now() + 5 * 60 * 1000 }, { new: true })

        const url = `https://localhost:3000/update-password/${token}`

        await mailSender("Passord reset link",
            `password reset like ${url}`,
            email);

        return res.status(200).json({
            message: "reset link successsfully sent"
        })

    }
    catch (err) {
        return res.status(400).json({
            message: "reset link error"
        })

    }
}

exports.resetPassword = async (req, res) => {
    try {
        const {token,password,confirmPassword} = req.body;
        if (!token||!password||!confirmPassword) {
            return res.status(400).json({
                message: "details missing in reset password"
            })
        }

        if(password !==confirmPassword){
            return res.status(400).json({
                message: "password doesnt match"
            })
        }
        const userDetails = await User.findOne({ token:token });
        if (!userDetails) {
            return res.status(400).json({
                message: "token invalid"
            })
        }
        
        if (!userDetails.resetPassword < Date.now()){
            return res.json({
                message: "reset password is expires"
            })
        }

        const hashedPassword = bcrypt.hash(password,10);

        await User.findOneAndUpdate( {token:token},{password:hashedPassword},{new:true})
        
        return res.status(200).json({
            message: "reset password is successsfully done"
        })

    }
    catch (err) {
        return res.status(400).json({
            message: "reset password error"
        })

    }
}