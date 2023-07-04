const deviceTokenRouter = require("express").Router()
const deviceTokenController = require("../controllers/deviceToken.controller")

deviceTokenRouter.post("/device-token", deviceTokenController.saveToken)

module.exports = deviceTokenRouter
