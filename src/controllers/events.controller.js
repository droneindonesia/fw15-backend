const errorHandler = require("../helpers/errorHandler.helper")
const eventsModel = require("../models/admin/events.model")
const eventCategoriesModel = require("../models/admin/eventcategories.model")
const cloudinary = require("cloudinary").v2

exports.getAllEvents = async (req, res) => {
    try {
        let data = await eventsModel.findAll(
            req.query.page,
            req.query.limit,
            req.query.search,
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

exports.getAllEventsByUserId = async (req, res) => {
    try {
        const { id: userId } = req.user
        let data = await eventsModel.findAllByUserId(
            req.query.page,
            req.query.limit,
            req.query.search,
            req.query.sort,
            req.query.sortBy,
            req.query.category,
            req.query.location,
            userId
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

exports.getEventsByParamsId = async (req, res) => {
    try {
        let data = await eventsModel.findOne(req.params.id)
        return res.json({
            success: true,
            message: "Get one events successfully",
            results: data,
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
            categoryId: req.body.categoryId,
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

        if (!id) {
            throw Error("Unauthorized")
        }

        const eventId = req.params.id
        const data = { ...req.body }
        const event = await eventsModel.update(eventId, id, data)

        const eventCategories = {
            eventId: event.id,
            categoryId: req.body.categoryId,
        }

        await eventCategoriesModel.update(id, eventCategories)

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
        const events = await eventsModel.findOne(req.params.id)
        const data = await eventsModel.destroy(req.params.id)
        await cloudinary.uploader.destroy(events.picture)
        await eventCategoriesModel.destroy(req.params.id)
        return res.json({
            success: true,
            message: "Delete events successfully",
            results: data,
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
