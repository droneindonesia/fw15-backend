const reservationsticketRouter = require("express").Router()
const reservationsticketController = require("../../controllers/admin/reservationsticket.controller")
const validate = require("../../middlewares/validator.middleware")

reservationsticketRouter.get("/", validate("getAll"), reservationsticketController.getAllReservationsTicket)
reservationsticketRouter.get("/:id", validate("getOne"), reservationsticketController.getOneReservationsTicket)
reservationsticketRouter.post(
  "/",
  validate("reservationsticket"),
  reservationsticketController.createReservationsTicket
)
reservationsticketRouter.patch("/:id", validate("Update"), reservationsticketController.updateReservationsTicket)
reservationsticketRouter.delete("/:id", validate("Delete"), reservationsticketController.deleteReservationsTicket)

module.exports = reservationsticketRouter
