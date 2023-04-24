const errorHandler = require("../helpers/errorHandler.helper")
const paymentsModel = require("../models/admin/reservations.model")

exports.createPayments = async (req, res) => {
    try {
        let data = await paymentsModel.insert(req.body)
        return res.json({
            success: true,
            message: "Create payments successfully",
            results: data
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
