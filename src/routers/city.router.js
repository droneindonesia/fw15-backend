const cityRouter = require("express").Router()
const citiesController = require("../controllers/cities.controller")

cityRouter.get("/", citiesController.getAll)

module.exports = cityRouter
