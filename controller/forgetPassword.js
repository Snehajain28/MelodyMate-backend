const User = require('../models/User')
const bcrypt = require('bcrypt')


exports.forgotPassword = async (req, res) => {

    try {
        const { email, password } = req.body;
       
        if (!email || !password) {
            return res.json({
                success: false,
                message: "fill all data "
            })
        }
 const user = await User.findOne({ email });
        if (!user) {
            return res.
                status(400).json({
                    success: false,
                    message: "user dont exist"
                })
        }

        const newPassword = await bcrypt.hash(password, 10)
       await User.findByIdAndUpdate({ _id: user._id },
            { $push: { password: newPassword} },
            { new: true })
        return res.
                status(200).json({
                    success: true,
                })
    }
    catch (e) {
        console.log("forgot password error")
        console.log(e)
    }

}