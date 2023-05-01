const historyRouter = require("express").Router()
const historyController = require("../controllers/history.controller")

historyRouter.get("/", historyController.getHistory)

module.exports = historyRouter
