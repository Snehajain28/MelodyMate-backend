
const User = require('../models/User')
const bcrypt = require('bcrypt')


exports.registerUser = async(req,res) => {

    try{
        const {name,email, phoneNumber,location,password}= req.body;
       
        if(!name || !email || !phoneNumber || !location || !password)
        {
          return  res.json({
                success:false,
                message:"fill all data "
             })
        }

        const existing = await User.findOne({email});
        if(existing)
        {
          return  res.json({
                success:false,
                message:"user already exist "
             })  
        }

    const newPassword=await bcrypt.hash(password,10)

  const newUser =  await User.create( {
        name,email,location,password:newPassword, phoneNumber
     })
     res.json({
        success:true,
        newUser
     })
    }
    catch(e) {
        console.log(e)
        console.log("creating user error")
    }

}