const paymentRouter = require("express").Router()
const paymentsController = require("../controllers/payment.controller")
const validate = require("../middlewares/validator.middleware")

paymentRouter.get("/", paymentsController.getPayments)

paymentRouter.post("/", validate("paymentmethod"), paymentsController.createPayments)

module.exports = paymentRouter
