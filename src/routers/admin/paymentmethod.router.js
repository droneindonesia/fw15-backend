const paymentmethodRouter = require("express").Router()
const paymentmethodController = require("../../controllers/admin/paymentmethod.controller")
const validate = require("../../middlewares/validator.middleware")

paymentmethodRouter.get("/", validate("getAll"), paymentmethodController.getAllPaymentMethod)
paymentmethodRouter.get("/:id", validate("getOne"), paymentmethodController.getOnePaymentMethod)
paymentmethodRouter.post("/", validate("paymentmethod"), paymentmethodController.createPaymentMethod)
paymentmethodRouter.patch("/:id", validate("Update"), paymentmethodController.updatePaymentMethod)
paymentmethodRouter.delete("/:id", validate("Delete"), paymentmethodController.deletePaymentMethod)

module.exports = paymentmethodRouter
