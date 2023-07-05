const reservationsectionRouter = require("express").Router()
const reservationsectionController = require("../../controllers/admin/reservationsection.controller")
const validate = require("../../middlewares/validator.middleware")

reservationsectionRouter.get("/", validate("getAll"), reservationsectionController.getAllReservationSection)
reservationsectionRouter.get("/:id", validate("getOne"), reservationsectionController.getOneReservationSection)
reservationsectionRouter.post(
  "/",
  validate("reservationsection"),
  reservationsectionController.createReservationSection
)
reservationsectionRouter.patch("/:id", validate("Update"), reservationsectionController.updateReservationSection)
reservationsectionRouter.delete("/:id", validate("Delete"), reservationsectionController.deleteReservationSection)

module.exports = reservationsectionRouter
