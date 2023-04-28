const errorHandler = require("../helpers/errorHandler.helper")
const wishlistModel = require("../models/admin/wishlist.model")

exports.getWishlist = async (req, res) => {
    try {
        let {id} = req.user
        let data = await wishlistModel.findOne(id)
        return res.json({
            success: true,
            message: "Get wishlist successfully",
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.getAllWishlist = async (req, res) => {
    try {
        let data = await wishlistModel.findAll(
            req.query.page,
            req.query.limit,
            req.query.search,
            req.query.sort,
            req.query.sortBy
        )
        return res.json({
            success: true,
            message: "Get All Wishlist successfully",
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
