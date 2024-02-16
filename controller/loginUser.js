const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.loginUser = async (req, res) => {

  try {
    const { email, password, token } = req.body;

    if (email && password) {

      const user = await User.findOne({ email });
      if (!user) {
        return res.
          status(400).json({
            success: false,
            message: "user dont exist"
          })
      }

      const newPassword = await bcrypt.compare(password, user.password);

      if (!newPassword) {
        return res.status(400).json({
          success: false,
          message: "password not match"
        })
      }


      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET)
     return   res.status(200).json({
        success: true,
        token,
        user,
        message: "Log in"
      })
    }
 
    return res.json({
      success: false,
      message: "fill all data "
    })
  }
  catch (e) {
    console.log("login user error")
    console.log(e)
  }

}