const citiesModel = require("../../models/admin/cities.model")
const errorHandler = require("../../helpers/errorHandler.helper")
const cloudinary = require("cloudinary").v2

exports.getAllcities = async (request, response) => {
  try {
    const data = await citiesModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      success: true,
      message: "List of all cities",
      results: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.getOneCities = async (request, response) => {
  try {
    let data = await citiesModel.findOne(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Get one cities successfully",
        results: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.createcities = async (request, response) => {
  try {
    if (request.file) {
      request.body.picture = request.file.filename
    }
    const user = await citiesModel.insert(request.body)
    return response.json({
      success: true,
      message: `Created city ${request.body.name} successfully`,
      result: user,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updatecities = async (request, response) => {
  try {
    const cities = await citiesModel.findOne(request.params.id)
    const data = await citiesModel.update(request.params.id, request.body)
    await cloudinary.uploader.destroy(cities.picture)
    if (request.file) {
      request.body.picture = request.file.filename
    }
    if (data) {
      return response.json({
        success: true,
        message: "Update city successfully",
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.deletecities = async (request, response) => {
  try {
    const cities = await citiesModel.findOne(request.params.id)
    const data = await citiesModel.destroy(request.params.id)
    await cloudinary.uploader.destroy(cities.picture)
    if (data) {
      return response.json({
        success: true,
        message: `Delete city ${request.params.id} successfully`,
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}
