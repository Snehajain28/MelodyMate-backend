const { default: mongoose } = require('mongoose');
const { instance } = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');

exports.capturePayment = async (req, res) => {
    try {
const {course_id}=req.body;
const userID = req.user.id;

if(!course_id){
    return res.status(500).json({
        success: false,
        message: "Payment err missing detail"
    })
}
    let course = await Course.findById({course_id});
    if(!course){
        return res.status(500).json({
            success: false,
            message: "course missing"
        })
    }

 
   const uid = new mongoose.Types.ObjectId(userID);
   if(course.studentsEnrolled.includes(uid)){
    return res.status(500).json({
        success: false,
        message: "user already presnet"
    })
   }
   const amount = course.price;
   const currency="INR"

   const option={
    amount:amount*100,
    currency,
    receipt:Math.random(Date.now()).toString();
    notes:{
        courseId:course_id,
        userID
    } 
   }
  const paymentReponse = await instance.orders.create(option)
 }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "PAyment err"
        })
    }

}