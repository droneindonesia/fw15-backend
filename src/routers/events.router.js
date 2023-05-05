const eventsRouter = require("express").Router()
const eventsController = require("../controllers/events.controller")
const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")

eventsRouter.get("/", validate("getAll"), eventsController.getAllEvents)
eventsRouter.get("/manage", eventsController.getEvents)
eventsRouter.get("/:id", eventsController.getEventsById)
eventsRouter.post("/manage", uploadMiddleware("picture"), validate("events"), eventsController.createEvent)
eventsRouter.patch("/manage", uploadMiddleware("picture"), validate("events"), eventsController.updateEvents)
eventsRouter.delete("/manage/:id", eventsController.destroy)


module.exports = eventsRouter
