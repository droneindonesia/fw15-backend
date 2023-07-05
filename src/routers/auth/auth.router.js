const authRouter = require("express").Router()
const authController = require("../../controllers/auth/auth.controller")
const validate = require("../../middlewares/validator.middleware")

authRouter.post("/login", validate("authLogin"), authController.login)
authRouter.post("/register", validate("authRegister"), authController.register)
authRouter.post("/forgot-password", validate("forgotPassword"), authController.forgotPassword)
authRouter.post("/reset-password", validate("resetPassword"), authController.resetPassword)

module.exports = authRouter
