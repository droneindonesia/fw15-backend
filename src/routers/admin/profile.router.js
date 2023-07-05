const profileRouter = require("express").Router()
const validate = require("../../middlewares/validator.middleware")
const profileController = require("../../controllers/admin/profile.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")

profileRouter.get("/", validate("getAll"), profileController.getAllProfile)
profileRouter.get("/:id", validate("getOne"), profileController.getOneProfile)
profileRouter.post("/", uploadMiddleware("picture"), validate("profile"), profileController.createProfile)
profileRouter.patch("/:id", uploadMiddleware("picture"), validate("Update"), profileController.updateProfile)
profileRouter.delete("/:id", validate("Delete"), profileController.deleteProfile)

module.exports = profileRouter
