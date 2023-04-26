const errorHandler = require("../helpers/errorHandler.helper")
const wishlistModel = require("../models/admin/wishlist.model")

exports.getAllModel = async (req, res) => {
    try {
        let data = await wishlistModel.findOne(req.params.id)
        return res.json({
            success: true,
            message: "Get all wishlist successfully",
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
