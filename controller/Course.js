
const Course = require('../models/Course');
const Tag = require('../models/Tag');
const { imageUploader } = require('../utils/imageUploader')
const User = require('../models/User');
require('dotenv').config();

exports.createCourse = async (req, res) => {
    try {

        const { courseName, cousreDescription, tag, price, whatYouWillLearn } = req.body;
        const thumbnail = req.files.thumbnailImage;

        if (!courseName || !cousreDescription || !tag || !price || !whatYouWillLearn) {
            return res.json({
                messgae: "creating course details missing",
            })
        }

        const userId = req.user.id;
        const instructorDetails = await User.findById({ userId })
        if (instructorDetails) {
            return res.json({
                messgae: "instructor id not found",
            })
        }
        const tagDetails = await Tag.findById({ tag })
        if (!tagDetails) {
            return res.json({
                messgae: "tag not find",
            })
        }
        const thumbnailImage = await imageUploader(thumbnail, process.env.FOLDER_NAME)

        const newCourse = await Course.create({
            courseName,
            cousreDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        })

        await User.findByIdAndUpdate({ _id: instructorDetails._id },
            { $push: { courses: newCourse._id } },
            { new: true })


        return res.json({
            messgae: "created course successfully",
        })
    }
    catch (err) {
        return res.json({
            messgae: "creating course error",
        })
    }
}


exports.showallCourses = async(req,res) => {

    try{
 const allCourses = await Course.find({})
    //CourseName:true,price:true,thumbnail:true,instructor:true,ratingAndReviews:true,studentEnrolled:true}).populate('instructor').exec();
 return res.json({
    messgae: "showing course ",
})
    }
    catch(err){
        return res.json({
            messgae: " course showing error",
        })
    }
}