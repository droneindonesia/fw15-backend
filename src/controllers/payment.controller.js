const errorHandler = require("../helpers/errorHandler.helper")
const reservationModel = require("../models/admin/reservations.model")
const reservationTicketModel = require("../models/admin/reservationsticket.model")

exports.createPayments = async (req, res) => {
    try {
        const { id } = req.user
        if (!id) {
            throw Error("Unauthorized")
        }

        const checkReservation = await reservationModel.findOne(id)
        if (!checkReservation) {
            throw Error("Reservation is not found")
        }

        const information = await reservationTicketModel.getInfo(id)

        const price = parseInt(information.price)
        const quantity = parseInt(information.quantity)
        const totalPayment = price * quantity

        const paymentInformation = {
            ...information,
            totalPayment,
        }

        return res.json({
            success: true,
            message: "Add payment successfully",
            results: paymentInformation,
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
