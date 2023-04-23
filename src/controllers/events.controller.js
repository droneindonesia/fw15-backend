const errorHandler = require("../helpers/errorHandler.helper")
const eventsModel = require("../models/admin/events.model")

exports.getAllEvents = async (req, res) => {
    try {
        let data = await eventsModel.findAll(
            req.query.page,
            req.query.limit,
            req.query.search,
            req.query.sort,
            req.query.sortBy
        )
        return res.json({
            success: true,
            message: "List of all events",
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.getEventsById = async (req, res) => {
    try {
        let data = await eventsModel.findOne(req.params.id)
        return res.json({
            success: true,
            message: "Get one events successfully",
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}


exports.addEvents = async (req, res) => {
    try {
        let data = await eventsModel.insert(req.body)
        return res.json({
            success: true,
            message: "Created events successfully",
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.updateEvents = async (req, res) => {
    try {
        let data = await eventsModel.update(req.params.id, req.body)
        return res.json({
            success: true,
            message: `Update events ${req.params.id} successfully`,
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
