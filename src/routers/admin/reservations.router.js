const reservationsRouter = require("express").Router()
const reservationsController = require("../../controllers/admin/reservations.controller")
const validate = require("../../middlewares/validator.middleware")

reservationsRouter.get("/", validate("getAll"), reservationsController.getAllReservations)
reservationsRouter.get("/:id", validate("getOne"), reservationsController.getOneReservations)
reservationsRouter.post("/", validate("reservations"), reservationsController.createReservations)
reservationsRouter.patch("/:id", validate("Update"), reservationsController.updateReservations)
reservationsRouter.delete("/:id", validate("Delete"), reservationsController.deleteReservations)

module.exports = reservationsRouter
