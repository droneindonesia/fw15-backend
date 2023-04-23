const eventsRouter = require("express").Router
const eventsController = require("../controllers/events.controller")

eventsRouter.get("/", eventsController.getAllEvents)
eventsRouter.get("/:id", eventsController.getEventsById)
eventsRouter.post("/manage", eventsController.addEvents)
