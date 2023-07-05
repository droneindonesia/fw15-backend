const userModel = require("../../models/admin/users.model")
const errorHandler = require("../../helpers/errorHandler.helper")
const argon = require("argon2")

exports.getAllUsers = async (request, response) => {
  try {
    const data = await userModel.findAll(
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

exports.getOneUsers = async (request, response) => {
  try {
    let data = await userModel.findOne(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Get one users successfully",
        results: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.findOneByEmail = async (request, response) => {
  try {
    let data = await userModel.findOneByEmail(request.body.email)
    return response.json({
      success: true,
      message: "Get email successfully",
      results: data,
    })
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.createUsers = async (request, response) => {
  try {
    const hash = await argon.hash(request.body.password)
    const data = {
      ...request.body,
      password: hash,
    }
    if (request.file) {
      data.picture = request.file.filename
    }
    const user = await userModel.insert(data)
    return response.json({
      success: true,
      message: `Created user ${request.body.email} successfully`,
      result: user,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updateUsers = async (request, response) => {
  try {
    const data = await userModel.update(request.params.id, request.body)
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

exports.deleteUsers = async (request, response) => {
  try {
    const data = await userModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `Delete user ${request.params.id} successfully`,
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}
