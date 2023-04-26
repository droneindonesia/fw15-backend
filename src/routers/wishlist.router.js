const wishlistRouter = require("express").Router()
const wishlistController = require("../controllers/wishlist.controller")

wishlistRouter.get("/", wishlistController.getWishlist)

module.exports = wishlistRouter
