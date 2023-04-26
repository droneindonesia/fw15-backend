const eventsRouter = require("express").Router()
const eventsController = require("../controllers/events.controller")
const validate = require("../middlewares/validator.middleware")

eventsRouter.get("/", eventsController.getAllEvents)
eventsRouter.get("/:id", validate("getOne"), eventsController.getEventsById)
eventsRouter.post("/manage", eventsController.addEvents)
eventsRouter.patch("/manage", eventsController.updateEvents)

module.exports = eventsRouter
