const eventcategoriesModel = require("../../models/admin/eventcategories.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllEventCategories = async (request, response) => {
  try {
    const data = await eventcategoriesModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      success: true,
      message: "List of all event categories",
      results: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.getOneEventCategories = async (request, response) => {
  try {
    let data = await eventcategoriesModel.findOne(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Get one event categories successfully",
        results: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.createEventCategories = async (request, response) => {
  try {
    const data = await eventcategoriesModel.insert(request.body)
    return response.json({
      success: true,
      message: `Created event category ${request.body.eventId} successfully`,
      result: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updateEventCategories = async (request, response) => {
  try {
    const data = await eventcategoriesModel.update(request.params.id, request.body)
    if (data) {
      return response.json({
        success: true,
        message: "Update event categories successfully",
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.deleteEventCategories = async (request, response) => {
  try {
    const data = await eventcategoriesModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `Delete event category ${request.params.id} successfully`,
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}
