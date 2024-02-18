
const User = require('../models/User')
const bcrypt = require('bcrypt')


exports.registerUser = async (req, res) => {

  try {
    const { name, email, phoneNumber, password, token } = req.body;
   let newUser;

    if (name && email && phoneNumber && password) {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.json({
          success: false,
          message: "User already exist "
        })
      }
      const newPassword = await bcrypt.hash(password, 10)
      newUser = await User.create({
        name, email, password: newPassword, phoneNumber
      })
    }
   

return   res.json({
      success: true,
      newUser
    })
  }
  catch (e) {
    console.log(e)
    console.log("creating user error")
  }

}