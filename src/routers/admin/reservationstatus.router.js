const reservationstatusRouter = require("express").Router()
const reservationstatusController = require("../../controllers/admin/reservationstatus.controller")
const validate = require("../../middlewares/validator.middleware")

reservationstatusRouter.get("/", validate("getAll"), reservationstatusController.getAllReservationStatus)
reservationstatusRouter.get("/:id", validate("getOne"), reservationstatusController.getOneReservationStatus)
reservationstatusRouter.post("/", validate("reservationstatus"), reservationstatusController.createReservationStatus)
reservationstatusRouter.patch("/:id", validate("Update"), reservationstatusController.updateReservationStatus)
reservationstatusRouter.delete("/:id", validate("Delete"), reservationstatusController.deleteReservationStatus)

module.exports = reservationstatusRouter
