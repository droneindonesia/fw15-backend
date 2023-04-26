const wishlistRouter = require("express").Router()
const wishlistController = require("../controllers/wishlist.controller")

wishlistRouter.get("/:id", wishlistController.getWishlist)
wishlistRouter.get("/", wishlistController.getAllWishlist)

module.exports = wishlistRouter
