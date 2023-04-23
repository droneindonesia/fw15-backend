const partnersRouter = require("express").Router()
const partnersController = require("../controllers/partners.controller")

partnersRouter.get("/", partnersController.getAllPartners)

module.exports = partnersRouter
