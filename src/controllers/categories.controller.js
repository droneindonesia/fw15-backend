const errorHandler = require("../helpers/errorHandler.helper")
const categoriesModel = require("../models/admin/categories.model")

exports.getAllCategories = async (req, res) => {
  try {
    let data = await categoriesModel.findAll(
      req.query.page,
      req.query.limit,
      req.query.search,
      req.query.sort,
      req.query.sortBy
    )
    return res.json({
      success: true,
      message: "Get all categories successfully",
      results: data,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
