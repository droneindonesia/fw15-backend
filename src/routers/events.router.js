const eventsRouter = require("express").Router()
const eventsController = require("../controllers/events.controller")
const validate = require("../middlewares/validator.middleware")

eventsRouter.get("/", validate("getAll"), eventsController.getAllEvents)
eventsRouter.get("/", validate("getOne"), eventsController.getEventsById)
eventsRouter.post("/manage", validate("events"), eventsController.addEvents)
eventsRouter.patch("/manage", validate("events"), eventsController.updateEvents)

module.exports = eventsRouter
