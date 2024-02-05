const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.loginUser = async(req,res) => {
     
  try{
        const {email,password}= req.body;


        if( !email || !password)
        {
          return  res.json({
                success:false,
                message:"fill all data "
             })
        }

    const user = await User.findOne({email});
       if(!user)
       {
        return res.
        status(400).json({
            success:false,
            message:"user dont exist"
         })
       }
    
       const newPassword =  await bcrypt.compare(password,user.password);

       if(!newPassword){
        return  res.status(400).json({
            success:false,
            message:"password not match"
         })
       }
      
   
       const token =  jwt.sign({_id:user.id},process.env.JWT_SECRET)
   res.status(200).json({
        success:true,
        token,
        user,
        message:"correct lorgin"
     })
    }
    catch(e) {
        console.log("login user error")
       console.log(e)
    }

}