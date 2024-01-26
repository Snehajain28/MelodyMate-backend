const mongoose = require ('mongoose');
const { mailSender } = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        },

        otp:{
            type:Number,
            required:true,
            },
     createdAt :{
      type:Date,
      default:Date.now(),
      expires: 5*60
    },
});

async function sendVerificaton(email,otp){
    try{
    const mailSender = await mailSender("Verfication email from StudyNotion", otp,email);
    }
    catch(err){
        console.log("verification error");
        console.log(err);
    }
}

otpSchema.pre('save' ,async function(next){
    await sendVerificaton(this.email,this.otp);
    next();
})


module.exports= mongoose.model('OTP', otpSchema);