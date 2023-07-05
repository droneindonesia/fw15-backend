const profileRouter = require("express").Router()
const uploadMiddleware = require("../middlewares/upload.middleware")
const profileController = require("../controllers/profile.controller")
const validate = require("../middlewares/validator.middleware")

profileRouter.get("/", validate("getAll"), profileController.getProfile)
profileRouter.patch("/", uploadMiddleware("picture"), validate("profile"), profileController.updateProfile)

module.exports = profileRouter
