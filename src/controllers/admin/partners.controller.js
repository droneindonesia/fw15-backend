const partnersModel = require("../../models/admin/partners.model")
const errorHandler = require("../../helpers/errorHandler.helper")
const cloudinary = require("cloudinary").v2

exports.getAllPartners = async (request, response) => {
  try {
    const data = await partnersModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      success: true,
      message: "List of all partners",
      results: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.getOnePartners = async (request, response) => {
  try {
    let data = await partnersModel.findOne(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Get one partners successfully",
        results: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.createPartners = async (request, response) => {
  try {
    if (request.file) {
      request.body.picture = request.file.filename
    }
    const user = await partnersModel.insert(request.body)
    return response.json({
      success: true,
      message: `Created partners ${request.body.name} successfully`,
      result: user,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updatePartners = async (request, response) => {
  try {
    const data = await partnersModel.update(request.params.id, request.body)
    const partners = await partnersModel.findOne(request.params.id)
    await cloudinary.uploader.destroy(partners.picture)
    if (request.file) {
      request.body.picture = request.file.filename
    }
    if (data) {
      return response.json({
        success: true,
        message: "Update partners successfully",
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.deletePartners = async (request, response) => {
  try {
    const partners = await partnersModel.findOne(request.params.id)
    const data = await partnersModel.destroy(request.params.id)
    await cloudinary.uploader.destroy(partners.picture)
    if (data) {
      return response.json({
        success: true,
        message: `Delete partners ${request.params.id} successfully`,
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}
