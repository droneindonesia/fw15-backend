const errorHandler = require("../helpers/errorHandler.helper")
// const paymentsModel = require("../models/admin/reservations.model")
// const reservationTicketModel = require("../models/admin/reservationsticket.model")

exports.createPayments = async (req, res) => {
    try {
        return res.json({
            success: true
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
