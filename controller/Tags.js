const Tag = require('../models/Tag');


exports.createTag = async (req, res) => {

    try {
        const { name, description } = req.body;
        if (!name || !description) {

            return res.json({
                messgae: "all fields require for tag",
            })
        }

        const tagDetails = await Tag.create({ name: name, description: description })
        return res.json({
            messgae: "tag created successfully",
        })
    }
    catch (err) {
        return res.json({
            messgae: "tag creation error",
        })
    }
}

exports.showAllTag = async (req, res) => {

    try {

        const allTag = await Tag.find({}, { name: true, description: true })
        return res.json({
            messgae: "tag showed successfully",
        })
    }
    catch (err) {
        return res.json({
            messgae: "tag showing error",
        })
    }
}