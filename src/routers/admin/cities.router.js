const citiesRouter = require("express").Router()
const citiesController = require("../../controllers/admin/cities.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")

citiesRouter.get("/", validate("getAll"), citiesController.getAllcities)
citiesRouter.get("/:id", validate("getOne"), citiesController.getOneCities)
citiesRouter.post("/", uploadMiddleware("picture"), validate("cities"), citiesController.createcities)
citiesRouter.patch("/:id", validate("Update"), citiesController.updatecities)
citiesRouter.delete("/:id", validate("Delete"), citiesController.deletecities)

module.exports = citiesRouter
