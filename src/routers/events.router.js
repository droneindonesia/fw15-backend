const eventsRouter = require("express").Router()
const eventsController = require("../controllers/events.controller")
const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")

eventsRouter.get("/", validate("getAll"), eventsController.getAllEvents)
eventsRouter.get("/:id", validate("getOne"), eventsController.getEventsById)
eventsRouter.post("/manage", uploadMiddleware("picture"), validate("events"), eventsController.addEvents)
eventsRouter.patch("/manage", uploadMiddleware("picture"), validate("events"), eventsController.updateEvents)

module.exports = eventsRouter
