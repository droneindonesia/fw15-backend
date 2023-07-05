const errorHandler = require("../helpers/errorHandler.helper")
const citiesModel = require("../models/admin/cities.model")

exports.getAll = async (req, res) => {
  try {
    let data = await citiesModel.findAll(
      req.query.page,
      req.query.limit,
      req.query.search,
      req.query.sort,
      req.query.sortBy
    )
    return res.json({
      success: true,
      message: "Get all cities successfully",
      results: data,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
