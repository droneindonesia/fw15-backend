const categoriesRouter = require("express").Router()
const categoriesController = require("../controllers/categories.controller")
const validate = require("../middlewares/validator.middleware")

categoriesRouter.get("/", validate("getAll"), categoriesController.getAllCategories)

module.exports = categoriesRouter
