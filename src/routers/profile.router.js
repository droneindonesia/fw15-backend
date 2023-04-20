const profileRouter = require("express").Router()
const uploadMiddleware = require("../middlewares/upload.middleware")
const profileController = require("../controllers/profile.controller")

profileRouter.get("/", profileController.getProfile)
profileRouter.post("/", uploadMiddleware("picture"), profileController.updateProfile)

module.exports = profileRouter
 