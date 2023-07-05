const partnersRouter = require("express").Router()
const partnersController = require("../../controllers/admin/partners.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")

partnersRouter.get("/", validate("getAll"), partnersController.getAllPartners)
partnersRouter.get("/:id", validate("getOne"), partnersController.getOnePartners)
partnersRouter.post("/", uploadMiddleware("picture"), validate("partners"), partnersController.createPartners)
partnersRouter.patch("/:id", validate("Update"), partnersController.updatePartners)
partnersRouter.delete("/:id", validate("Delete"), partnersController.deletePartners)

module.exports = partnersRouter
