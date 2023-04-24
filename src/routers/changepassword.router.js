const changePasswordRouter = require("express").Router()
const changePasswordController = require("../controllers/changepasswod.controller")

changePasswordRouter.post("/", changePasswordController.changePassword)

module.exports = changePasswordRouter
