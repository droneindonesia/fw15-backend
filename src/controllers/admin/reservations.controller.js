const reservationsModel = require("../../models/admin/reservations.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllReservations = async (request, response) => {
  try {
    const data = await reservationsModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      success: true,
      message: "List of all reservations",
      results: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.getOneReservations = async (request, response) => {
  try {
    let data = await reservationsModel.findOne(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Get one wishlist successfully",
        results: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.createReservations = async (request, response) => {
  try {
    const user = await reservationsModel.insert(request.body)
    return response.json({
      success: true,
      message: `Created reservations ${request.body.eventId} successfully`,
      result: user,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updateReservations = async (request, response) => {
  try {
    const data = await reservationsModel.update(request.params.id, request.body)
    if (data) {
      return response.json({
        success: true,
        message: "Update reservations successfully",
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.deleteReservations = async (request, response) => {
  try {
    const data = await reservationsModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `Delete reservation ${request.params.id} successfully`,
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}
