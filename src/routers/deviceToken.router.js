const router = require("express").Router()
const deviceTokenController = require("../controllers/deviceToken.controller")

const deviceTokenRouter = router()

deviceTokenRouter.post("/device-token", deviceTokenController)

module.exports = deviceTokenRouter
