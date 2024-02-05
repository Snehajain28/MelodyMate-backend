const Profile= require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');


exports.updateProfile = async (req, res) => {

    try {
    const {dateOfBirth,about,number,dob} = req.body;
        const userID = req.user.id;
        if (!gender||!about||!number||!dateOfBirth||!userID) {

            return res.json({
                messgae: "all fields require for tag",
            })
        }

        const usreDetails= await User.findById({userID})
        const profileID = usreDetails.additionalDetails;

        const updateProfile = await Profile.findByIdAndUpdate({profileID},
                              {dateOfBirth:dateOfBirth,about:about,gender:gender,number:number},{new:true})
        return res.json({
            messgae: "tag created successfully",
        })
    }
    catch (err) {
        return res.json({
            messgae: "profile updation error",
        })
    }
}

exports.deleteAccount = async (req, res) => {

    try {

        const userID = req.user.id;
        if (userID) {
              return res.json({
                messgae: "user id missing",
            })
        }
        const user= await User.findById({userID});
         const profileID= user.additionalDetails;

         await Profile.findByIdAndDelete({profileID});

        await User.findByIdAndDelete({userID});

        return res.json({
            messgae: "deleted  successfully",
        })
    }
    catch (err) {
        return res.json({
            messgae: "profile deletion error",
        })
    }
}

exports.getAllUserDetails= async (req, res) => {

    try {
       
        const userID = req.user.id;
        if (!userID) {
               return res.json({
                messgae: "all fields require for tag",
            })
        }

        const usreDetails= await User.findById({userID}).populate("additionalDeatails").exec();
       return res.json({
            messgae: "user get successfully",
        })
    }
    catch (err) {
        return res.json({
            messgae: "geting user error",
        })
    }
}