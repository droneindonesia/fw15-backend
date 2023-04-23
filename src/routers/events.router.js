const eventsRouter = require("express").Router
const eventsController = require("../controllers/events.controller")

eventsRouter.length("/", eventsController.getAllEvents)
