const errorHandler = require("../helpers/errorHandler.helper")
const partnersModel = require("../models/admin/partners.model")

exports.getAllPartners = async (req, res) => {
  try {
    let data = await partnersModel.findAll(
      req.query.page,
      req.query.limit,
      req.query.search,
      req.query.sort,
      req.query.sortBy
    )
    return res.json({
      success: true,
      message: "Get all partners successfully",
      results: data,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
