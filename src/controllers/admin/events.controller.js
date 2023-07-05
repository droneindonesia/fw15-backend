const eventsModel = require("../../models/admin/events.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllEvents = async (request, response) => {
  try {
    const data = await eventsModel.findAll(
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

exports.getOneEvents = async (request, response) => {
  try {
    let data = await eventsModel.findOne(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Get one events method successfully",
        results: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.createEvents = async (request, response) => {
  try {
    if (request.file) {
      request.body.picture = request.file.filename
    }
    const user = await eventsModel.insert(request.body)
    return response.json({
      success: true,
      message: `Created events ${request.body.title} successfully`,
      result: user,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updateEvents = async (request, response) => {
  try {
    const data = await eventsModel.update(request.params.id, request.body)
    if (request.file) {
      request.body.picture = request.file.filename
    }
    if (data) {
      return response.json({
        success: true,
        message: "Update events successfully",
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.deleteEvents = async (request, response) => {
  try {
    const data = await eventsModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `Delete events ${request.params.id} successfully`,
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}
