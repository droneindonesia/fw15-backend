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
