const errorHandler = require("../helpers/errorHandler.helper")
const eventsModel = require("../models/admin/events.model")
const eventCategoriesModel = require("../models/admin/eventcategories.model")

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
            results: data,
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.getEvent = async (req, res) => {
    try {
        const data = await eventsModel.findEvent(
            req.query.page,
            req.query.limit,
            req.query.name,
            req.query.sort,
            req.query.sortBy,
            req.query.category,
            req.query.location
        )
        return res.json({
            success: true,
            message: "List of all events",
            results: data,
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.getEventsById = async (req, res) => {
    try {
        let data = await eventsModel.findEventsByUser(req.params.id)
        return res.json({
            success: true,
            message: "Get one events successfully",
            results: data,
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.getEvents = async (req, res) => {
    try {
        const { id } = req.user
        let getEvents = await eventsModel.findEventsByUser(id)
        return res.json({
            success: true,
            message: "List event that you get",
            results: getEvents,
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.createEvent = async (req, res) => {
    try {
        if (req.file) {
            req.body.picture = req.file.filename
        }
        const { id } = req.user
        let data = { ...req.body, createdBy: id }
        const event = await eventsModel.insert(data)
        const eventCategories = {
            eventId: event.id,
            categoryId: data.categoryId,
        }

        await eventCategoriesModel.insert(eventCategories)

        return res.json({
            success: true,
            message: "Created events successfully",
            results: event,
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.updateEvents = async (req, res) => {
    try {
        if (req.file) {
            req.body.picture = req.file.filename
        }
        const { id } = req.user
        const data = { ...req.body }
        const event = await eventsModel.update(id, data)

        return res.json({
            success: true,
            message: "Update events successfully",
            results: event,
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.destroy = async (req, res) => {
    try {
        const { id } = req.user
        if (!id) {
            throw Error("Unauthorized")
        }
        const data = await eventsModel.destroy(req.params.id)
        return res.json({
            success: true,
            message: "Delete events successfully",
            results: data,
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
