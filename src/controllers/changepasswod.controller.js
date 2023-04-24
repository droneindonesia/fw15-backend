const errorHandler = require("../helpers/errorHandler.helper")
const changePasswordModel = require("../models/admin/changepassword.model")

exports.changePassword = async (req, res) => {
    try {
        const user = req.user
        let oldPassword = await changePasswordModel.findUserBy
        let data = await changePasswordModel.changePassword(user, req.body.newPassword)
        return res.json({
            success: true,
            message: "Password updated successfully",
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
