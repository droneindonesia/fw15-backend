const deviceTokenModel = require("../models/admin/deviceToken.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.getAll = async (req, res) => {
  try {
    let data = await deviceTokenModel.findAll(
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

exports.saveToken = async (req, res) => {
  try {
    const { id } = req.user
    const data = req.body
    const dataResults = await deviceTokenModel.insert(id, data)
    return res.json({
      success: true,
      message: "Token saved",
      results: dataResults,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
