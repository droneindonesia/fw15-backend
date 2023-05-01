const cityRouter = require("express").Router()
const citiesController = require("../controllers/cities.controller")
const validate = require("../middlewares/validator.middleware")

cityRouter.get("/", validate("getAll"), citiesController.getAll)

module.exports = cityRouter
