const reservationsRouter = require("express").Router()
const reservationsController = require("../controllers/reservations.controller")
const validate = require("../middlewares/validator.middleware")

reservationsRouter.post("/", validate("reservationsticket"), reservationsController.createReservations)
reservationsRouter.post("/ticket", reservationsController.makeTicket)

module.exports = reservationsRouter
