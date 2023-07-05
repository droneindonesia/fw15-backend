const wishlistRouter = require("express").Router()
const wishlistController = require("../../controllers/admin/wishlists.controller")
const validate = require("../../middlewares/validator.middleware")

wishlistRouter.get("/", validate("getAll"), wishlistController.getAllWishlist)
wishlistRouter.get("/:id", validate("getOne"), wishlistController.getOneWishlist)
wishlistRouter.post("/", validate("wishlists"), wishlistController.createWishlist)
wishlistRouter.patch("/:id", validate("Update"), wishlistController.updateWishlist)
wishlistRouter.delete("/:id", validate("Delete"), wishlistController.deleteWishlist)

module.exports = wishlistRouter
