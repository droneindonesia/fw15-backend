const categoriesModel = require("../../models/admin/categories.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllCategories = async (request, response) => {
  try {
    const data = await categoriesModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      success: true,
      message: "List of all categories",
      results: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.getOneCategories = async (request, response) => {
  try {
    let data = await categoriesModel.findOne(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Get one categories successfully",
        results: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.createCategories = async (request, response) => {
  try {
    const categories = await categoriesModel.insert(request.body)
    return response.json({
      success: true,
      message: `Created categories ${request.body.name} successfully`,
      result: categories,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updateCategories = async (request, response) => {
  try {
    const data = await categoriesModel.update(request.params.id, request.body)
    if (data) {
      return response.json({
        success: true,
        message: "Update category successfully",
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.deleteCategories = async (request, response) => {
  try {
    const data = await categoriesModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `Delete category ${request.params.id} successfully`,
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}
