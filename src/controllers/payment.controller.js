/* eslint-disable indent */
const errorHandler = require("../helpers/errorHandler.helper")
const reservationTicketModel = require("../models/admin/reservationsticket.model")

exports.createPayments = async (req, res) => {
    try {
        const { id } = req.user
        if (!id) {
            throw Error("Unauthorized")
        }

        const information = await reservationTicketModel.getInfo(id)

        const price = parseInt(information.price)
        const quantity = parseInt(information.quantity)
        const totalPayment = price * quantity

        const paymentInformation = {
          ...information,
          totalPayment
        }

        return res.json({
          success: true,
          message: "Change payment method successfully",
          results: paymentInformation
        })

    } catch (err) {
        return errorHandler(res, err)
    }
}
