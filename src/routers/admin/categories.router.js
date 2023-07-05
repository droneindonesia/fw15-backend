const categoriesRouter = require("express").Router()
const categoriesController = require("../../controllers/admin/categories.controller")
const validate = require("../../middlewares/validator.middleware")

categoriesRouter.get("/", validate("getAll"), categoriesController.getAllCategories)
categoriesRouter.get("/:id", validate("getOne"), categoriesController.getOneCategories)
categoriesRouter.post("/", validate("categories"), categoriesController.createCategories)
categoriesRouter.patch("/:id", validate("Update"), categoriesController.updateCategories)
categoriesRouter.delete("/:id", validate("Delete"), categoriesController.deleteCategories)

module.exports = categoriesRouter
