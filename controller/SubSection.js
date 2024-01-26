const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const { imageUploader } = require('../utils/imageUploader');

exports.createSubSection = async (req, res) => {

    try {
        const { title, description, timeduration, sectionID } = req.body;
        const video = req.files.videofile;

        if (!title || !description || !timeduration || !sectionID || !video) {
            return res.status(400).json({
                message: "missing subsection details"
            })
        }

        const uploadVideo = await imageUploader(video, process.env.FOLDER_NAME);


        const newsubSection = await SubSection.create({ title: title, description: description, timeDuration: timeDuration, videoUrl: uploadVideo })

        const response = await Section.findByIdAndUpdate({ sectionID }, { $push: { SubSection: newsubSection._id } }, { new: true })

        return res.status(200).json({
            message: "creation of section successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "creation of subsection err"
        })
    }
}
//update
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionName, sectionID } = req.body;
        if (!sectionName || !sectionID) {
            return res.status(400).json({
                message: "missing section details"
            })
        }
        const newSection = await Section.findByIdAndUpdate({ sectionID }, { sectionName: sectionName }, { new: true })


        return res.status(200).json({
            message: "updation of section successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "update of section err"
        })
    }
}
//delete
exports.deleteSection = async (req, res) => {

    try {
        const { courseID, sectionID } = req.params;
        if (!courseID || !sectionID) {
            return res.status(400).json({
                message: "missing section details"
            })
        }

        //await Course.findByIdAndUpdate({couseID},{$pull:{Section:sectionID}},{new:true})

        await Section.findOneAndDelete({ sectionID })

        return res.status(200).json({
            message: "deletion of section successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "delete section err"
        })
    }
}