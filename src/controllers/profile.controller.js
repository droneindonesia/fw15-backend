const fileRemover = require("../helpers/fileremover.helper")
const profileModel = require("../models/admin/profile.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.user
        const user = await profileModel.findOneByUserId(id)
        const data = {
            ...req.body,
        }
        if(req.file){
            if(user.picture){
                fileRemover({filename: user.picture})
            }
            data.picture =  req.file.filename
        }
        const profile = await profileModel.updatebyUserId(id, data)
        if(!profile){
            throw Error ("Update profile failed")
        }
        return res.json({
            success: true,
            message: "Profile updated",
            result: profile
        }) 
    } catch (e) {
        return errorHandler(res, e)
    }
}

exports.getProfile = async (req, res) => {
    try {
        const { id } = req.user
        console.log(req.user)
        const profile = await profileModel.findOneByUserId(id)
        if(!profile){
            throw Error("profile_not_found")
        }
        return res.json({
            success: true,
            message: "Profile",
            results: profile
        })
    } catch(e) {
        return errorHandler(res, e)
    }
}
