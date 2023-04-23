const reservationsModel = require("../models/admin/reservations.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.createReservations = async (req, res) => {
    try {
        let data = await reservationsModel(req.body)
        return res.json({
            success: true,
            message: "Create reservation successfully",
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
