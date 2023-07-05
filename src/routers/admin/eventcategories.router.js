const eventcategoriesRouter = require("express").Router()
const eventcategoriesController = require("../../controllers/admin/eventcategories.controller")
const validate = require("../../middlewares/validator.middleware")

eventcategoriesRouter.get("/", validate("getAll"), eventcategoriesController.getAllEventCategories)
eventcategoriesRouter.get("/:id", validate("getOne"), eventcategoriesController.getOneEventCategories)
eventcategoriesRouter.post("/", validate("eventcategories"), eventcategoriesController.createEventCategories)
eventcategoriesRouter.patch("/:id", validate("Update"), eventcategoriesController.updateEventCategories)
eventcategoriesRouter.delete("/:id", validate("Delete"), eventcategoriesController.deleteEventCategories)

module.exports = eventcategoriesRouter
