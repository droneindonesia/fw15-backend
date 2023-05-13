const userRouter = require("express").Router()
const validate = require("../../middlewares/validator.middleware")
const userController = require("../../controllers/admin/users.controller")

userRouter.get("/", validate("getAll"), userController.getAllUsers)
userRouter.get("/:id", validate("getOne"), userController.getOneUsers)
userRouter.post("/", validate("users"), userController.createUsers)
userRouter.patch("/:id", validate("Update"), userController.updateUsers)
userRouter.delete("/:id", validate("Delete"), userController.deleteUsers)

module.exports = userRouter
