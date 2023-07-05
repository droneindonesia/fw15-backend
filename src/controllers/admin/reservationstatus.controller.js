const reservationsstatusModel = require("../../models/admin/reservationstatus.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllReservationStatus = async (request, response) => {
  try {
    const data = await reservationsstatusModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      success: true,
      message: "List of all reservation status",
      results: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.getOneReservationStatus = async (request, response) => {
  try {
    let data = await reservationsstatusModel.findOne(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Get one Reservation Status successfully",
        results: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.createReservationStatus = async (request, response) => {
  try {
    const user = await reservationsstatusModel.insert(request.body)
    return response.json({
      success: true,
      message: `Created reservation status ${request.body.name} successfully`,
      result: user,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updateReservationStatus = async (request, response) => {
  try {
    const data = await reservationsstatusModel.update(request.params.id, request.body)
    if (data) {
      return response.json({
        success: true,
        message: "Update reservation status successfully",
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.deleteReservationStatus = async (request, response) => {
  try {
    const data = await reservationsstatusModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `Delete reservation status ${request.params.id} successfully`,
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}
