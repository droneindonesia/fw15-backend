const reservationsModel = require("../models/admin/reservations.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.getHistory = async (req, res) => {
  try {
    const { id } = req.user
    const history = await reservationsModel.findOneByUserId(id)
    return res.json({
      success: true,
      message: "Detail history",
      results: history,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
