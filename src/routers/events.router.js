const eventsRouter = require("express").Router()
const eventsController = require("../controllers/events.controller")
const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const authMiddleware = require("../middlewares/auth.middleware")

eventsRouter.get("/", validate("getAll"), eventsController.getAllEvents)
eventsRouter.get("/manage", authMiddleware, eventsController.getEvents)
eventsRouter.get("/:id", eventsController.getEventsById)
eventsRouter.post("/manage", authMiddleware, uploadMiddleware("picture"), validate("events"), eventsController.createEvent)
eventsRouter.patch("/manage", authMiddleware, uploadMiddleware("picture"), validate("events"), eventsController.updateEvents)
eventsRouter.delete("/manage/:id", authMiddleware, eventsController.destroy)


module.exports = eventsRouter
