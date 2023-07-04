const deviceTokenModel = require("../models/admin/deviceToken.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.saveToken = async (req, res) => {
    try {
        const { id } = req.user
        const { token } = req.body
        const { data } = await deviceTokenModel.insert(id, { token })
        return res.json({
            success: true,
            message: "Token saved",
            results: data,
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
