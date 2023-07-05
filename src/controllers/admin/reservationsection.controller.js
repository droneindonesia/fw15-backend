const reservationsectionModel = require("../../models/admin/reservationsection.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllReservationSection = async (request, response) => {
  try {
    const data = await reservationsectionModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      success: true,
      message: "List of all reservation section",
      results: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.getOneReservationSection = async (request, response) => {
  try {
    let data = await reservationsectionModel.findOne(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Get one reservation section successfully",
        results: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.createReservationSection = async (request, response) => {
  try {
    const data = await reservationsectionModel.insert(request.body)
    return response.json({
      success: true,
      message: `Created reservation section ${request.body.name} successfully`,
      result: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updateReservationSection = async (request, response) => {
  try {
    const data = await reservationsectionModel.update(request.params.id, request.body)
    if (data) {
      return response.json({
        success: true,
        message: "Update reservation section successfully",
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.deleteReservationSection = async (request, response) => {
  try {
    const data = await reservationsectionModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `Delete reservation section ${request.params.id} successfully`,
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}
