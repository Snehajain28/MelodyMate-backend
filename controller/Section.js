const Section = require ('../models/Section');
const Course = require('../models/Course');

exports.createSection = async (req,res) =>{

    try{
const {sectionName,couseID} = req.body;
if(!sectionName||!couseID){
    return res.status (400).json({ 
        message:"missing section details"
    })
}
const newSection = await Section.create({ sectionName})

 const response = await Course.findByIdAndUpdate({couseID},{$push :{courseContent:newSection._id}},{new:true})

 return res.status (200).json({
    message:"creation of section successfully"
})
    }
    catch(err){
        return res.status (500).json({
            message:"creation of section err"
        })
    }
}

exports.updateSection = async (req,res) =>{

    try{
const {sectionName,sectionID} = req.body;
if(! sectionName||!sectionID){
    return res.status (400).json({ 
        message:"missing section details"
    })
}
const newSection = await Section.findByIdAndUpdate({sectionID},{sectionName:sectionName},{new:true})
 

 return res.status (200).json({
    message:"updation of section successfully"
})
    }
    catch(err){
        return res.status (500).json({
            message:"update of section err"  
        })
    } 
}

exports.deleteSection = async (req,res) =>{

    try{
const {courseID, sectionID} = req.params;
if(!courseID||!sectionID){
    return res.status (400).json({ 
        message:"missing section details"
    })
}
 
//await Course.findByIdAndUpdate({couseID},{$pull:{Section:sectionID}},{new:true})

await Section.findOneAndDelete({sectionID})

 return res.status (200).json({
    message:"deletion of section successfully"
})
    }
    catch(err){
        return res.status (500).json({
            message:"delete section err"  
        })
    } 
}