const errorHandler = require("../helpers/errorHandler.helper")
const eventsModel = require("../models/admin/events.model")
const wishlistModel = require("../models/admin/wishlist.model")

exports.getWishlist = async (req, res) => {
  try {
    let { id } = req.user
    let wishlistData = await wishlistModel.findOneById(id)
    return res.json({
      success: true,
      message: "Get wishlist successfully",
      results: wishlistData,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

exports.makeWishlist = async (req, res) => {
  try {
    let { id } = req.user

    const data = { ...req.body, userId: id }

    const checkEvent = await eventsModel.findOne(req.body.eventId)
    if (!checkEvent) {
      throw Error("Can't make wishlist because event is not found")
    }

    const wishlist = await wishlistModel.insert(data)

    return res.json({
      success: true,
      message: "Insert wishlist successfully",
      results: wishlist,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

exports.deleteWishlist = async (req, res) => {
  try {
    const { id } = req.user

    if (!id) {
      throw Error("Unauthorized")
    }

    let data = await wishlistModel.destroy(req.params.id)
    return res.json({
      success: true,
      message: "Delete wishlist successfully",
      results: data,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
