const Otp = require('../models/OTP');
const otpgenerator = require('otp-generator');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mailSender } = require('../utils/mailSender');
require('dotenv').config();

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(401).json({
                message: "user already exists"
            })
        }
        var otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })
        var uniqueotp = await Otp.findOne({ otp: otp })

        while (uniqueotp) {
            otp = otpgenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            uniqueotp = await Otp.findOne({ otp: otp })

        }
        const otpBody = await Otp.create({ email, otp });

        res.status(200).json({
            success: true,
            message: "otp generation successfull"
        })
    }
    catch (err) {
        console.log("send otp controller facing issue");
        console.log(err);
    }
}


exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accoutType, contactNumber, otp } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber || !otp) {
            return res.status(403).json({
                message: "enter all details"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "paasword not match"
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "already email exists"
            });
        }

        const recentOtp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);

        if (recentOtp) {
            return res.status(400).json({
                success: false,
                message: "otp not found"
            });
        }

        else if (otp !== recentOtp) {
            return res.status(400).json({
                success: false,
                message: "otps  not match"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null, about: null, contactNumber: null
        })
        const user = await User.create({
            firstName, lastName, email, password: hashedPassword, accoutType, contactNumber, additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        return res.status(200).json({
            success: true,
            message: "user created successfully"
        })

    }
    catch (err) {

        return res.status(500).json({
            success: false,
            message: "overall signup error"
        })
    }
}


exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "fill all entity"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user doesnt exist"
            })
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(403).json({
                success: false,
                message: "password not matched"
            })
        }
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        }
        let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.cookie('namcookie', token, options).status(200).json({
            success: true,
            user,
            token,
            message: "logged in successfully"
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "overall login error"
        })
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword,confirmNewPassword } = req.body;

        const user = await User.findOne({ email });

        if (!email || !oldPassword || !newPassword||!confirmNewPassword) {
            return res.status(500).json({
                success: false,
                message: "fill all details"
            })
        }
        if(newPassword !== confirmNewPassword)
        {
            return res.status(500).json({
                success: false,
                message: "password doesnt match"
            })
        }
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "password ya email wrong"
            })
        }
        if (!(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(403).json({
                success: false,
                message: "password not matched"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
                mailSender("Password changed", newPassword,email);
        await User.findOneAndUpdate({email:email},{password:hashedPassword},{new:true});
        return res.status(200).json({
            success: true,
            message: "changing password successfull"
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "changing password error"
        })
    }
}