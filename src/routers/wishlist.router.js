const wishlistRouter = require("express").Router()
const wishlistController = require("../controllers/wishlist.controller")
const validate = require("../middlewares/validator.middleware")

wishlistRouter.get("/", validate("getOne"), wishlistController.getWishlist)
wishlistRouter.post(
    "/",
    validate("manageWishlist"),
    wishlistController.makeWishlist
)

module.exports = wishlistRouter
