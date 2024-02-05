const mongoose = require ('mongoose')

const AddressSchema = new mongoose.Schema({
    address:{
        type:String,
        required:true, 
      },
     city:{
        type:String,
        required:true, 
      },
      email:{
        type:String,
        required:true, 
      },
      name:{
        type:String,
        required:true, 
      },
      phone:{
        type:String,
        required:true, 
      },
      state:{
        type:String,
        required:true, 
      },
      zip:{
        type:String,
        required:true, 
      },
});

module.exports= mongoose.model('Address',AddressSchema);