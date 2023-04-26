const profileRouter = require("express").Router()
const uploadMiddleware = require("../middlewares/upload.middleware")
const profileController = require("../controllers/profile.controller")
const validate = require("../middlewares/validator.middleware")

profileRouter.get("/", profileController.getProfile)
profileRouter.post("/", uploadMiddleware("picture"), validate("profile"), profileController.updateProfile)

module.exports = profileRouter
 