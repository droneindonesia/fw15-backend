const paymentRouter = require("express").Router()
const paymentsController = require("../controllers/payment.controller")

paymentRouter.post("/", paymentsController.createPayments)

module.exports = paymentRouter
