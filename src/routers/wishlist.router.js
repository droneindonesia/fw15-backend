const wishlistRouter = require("express").Router()
const wishlistController = require("../controllers/wishlist.controller")
const validate = require("../middlewares/validator.middleware")

wishlistRouter.get("/:id", validate("getOne"), wishlistController.getWishlist)
wishlistRouter.get("/", validate("getAll"), wishlistController.getAllWishlist)

module.exports = wishlistRouter
