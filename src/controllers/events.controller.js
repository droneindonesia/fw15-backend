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
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.getEventsById = async (req, res) => {
    try {
        let { id } = req.user
        if(!id) {
            throw Error("Unauthorized")
        }
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

exports.getEvents = async (req, res) => {
    try {
        const {id} = req.user
        console.log(id)
        let getEvents = await eventsModel.findEventByUser(id)
        return res.json({
            success: true,
            message: "List event that you get",
            results: getEvents
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.createEvent = async (req, res) => {
    try {
        const {id} = req.user
        let data = { ...req.body, createdBy: id }
        const event = await eventsModel.insert(data)
        const eventCategories = {
            eventId: event.id,
            categoryId: data.categoryId
        }

        await eventCategoriesModel.insert(eventCategories)

        return res.json({
            success: true,
            message: "Created events successfully",
            results: event
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.updateEvents = async (req, res) => {
    try {
        const data = {...req.body}
        const event = await eventsModel.update(req.params.id, data)
        return res.json({
            success: true,
            message: "Update events successfully",
            results: event
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
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
