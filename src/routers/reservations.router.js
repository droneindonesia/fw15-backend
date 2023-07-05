const reservationsRouter = require("express").Router()
const reservationsController = require("../controllers/reservations.controller")
const validate = require("../middlewares/validator.middleware")

reservationsRouter.post("/", validate("reservations"), reservationsController.createReservations)
reservationsRouter.post("/ticket", validate("reservationsticket"), reservationsController.makeTicket)
reservationsRouter.get("/sections", reservationsController.getReservationSection)

module.exports = reservationsRouter
