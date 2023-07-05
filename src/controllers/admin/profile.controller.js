const profileModel = require("../../models/admin/profile.model")
const errorHandler = require("../../helpers/errorHandler.helper")
const cloudinary = require("cloudinary").v2

exports.getAllProfile = async (request, response) => {
  try {
    const data = await profileModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      success: true,
      message: "List of all users",
      results: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.getOneProfile = async (request, response) => {
  try {
    let data = await profileModel.findOne(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Get one profile successfully",
        results: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.createProfile = async (request, response) => {
  try {
    if (request.file) {
      request.body.picture = request.file.filename
    }
    const profile = await profileModel.insert(request.body)
    return response.json({
      success: true,
      message: `Created profile ${request.body.fullName} successfully`,
      result: profile,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updateProfile = async (request, response) => {
  try {
    const data = await profileModel.update(request.params.id, request.body)
    if (data) {
      return response.json({
        success: true,
        message: "Update user successfully",
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.deleteProfile = async (request, response) => {
  try {
    const profile = await profileModel.findOne(request.params.id)
    const data = await profileModel.destroy(request.params.id)
    await cloudinary.uploader.destroy(profile.picture)
    if (data) {
      return response.json({
        success: true,
        message: `Delete profile ${request.params.id} successfully`,
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}
