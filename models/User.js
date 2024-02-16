const mongoose = require('mongoose');

 const userSchema=new mongoose.Schema({
 
    name:{
        type:String,
        required:true,
    },
 
  email:{
    type:String,
  
  },
 
  password:{
    type:String,
  
  },
  phoneNumber: {
    type:String,
  
  },
  token: {
    type:String,
  
  },
  role: {
    type:Number,
    default:0
  },
  
  createdAt:{
    type:Date,
    default:Date.now
  },
  addresses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Address",
}],
orders:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Order",
}],
});

module.exports =mongoose.model("User" , userSchema);