const reservationsModel = require("../models/admin/reservations.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.createReservations = async (req, res) => {
    try {
        const { id } = req.user

        const data = {userId: id, ...req.body}

        const reservation = await reservationsModel.insert(data)
        return res.json({
            success: true,
            message: "Add reservations successfully",
            results: reservation
        })

    } catch (err) {
        return errorHandler(res, err)
    }
}
