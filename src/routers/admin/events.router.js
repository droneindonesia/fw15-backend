const eventsRouter = require("express").Router()
const eventsController = require("../../controllers/admin/events.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")

eventsRouter.get("/", validate("getAll"), eventsController.getAllEvents)
eventsRouter.get("/:id", validate("getOne"), eventsController.getOneEvents)
eventsRouter.post("/", uploadMiddleware("picture"), validate("events"), eventsController.createEvents)
eventsRouter.patch("/:id", validate("Update"), eventsController.updateEvents)
eventsRouter.delete("/:id", validate("Delete"), eventsController.deleteEvents)

module.exports = eventsRouter
