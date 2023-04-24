const reservationsTicketModel = require("../models/admin/reservationsticket.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.createReservations = async (req, res) => {
    try {
        let data = await reservationsTicketModel.insert(req.body)
        return res.json({
            success: true,
            message: "Create reservation successfully",
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
