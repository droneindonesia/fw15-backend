const errorHandler = require("../helpers/errorHandler.helper")
const wishlistModel = require("../models/admin/wishlist.model")

exports.getWishlist = async (req, res) => {
    try {
        let { id } = req.user
        let wishlistData = await wishlistModel.findOneById(id)
        return res.json({
            success: true,
            message: "Get wishlist successfully",
            results: wishlistData
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.makeWishlist = async (req, res) => {
    try {
        let { id } = req.user
        const data = { ...req.body, userId: id}
        const wishlist = await wishlistModel.insert(data)
        return res.json({
            success: true,
            message: "Insert wishlist successfully",
            results: wishlist
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
