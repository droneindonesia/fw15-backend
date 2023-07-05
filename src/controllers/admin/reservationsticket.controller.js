const reservationsticketModel = require("../../models/admin/reservationsticket.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllReservationsTicket = async (request, response) => {
  try {
    const data = await reservationsticketModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      success: true,
      message: "List of all reservations ticket",
      results: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.getOneReservationsTicket = async (request, response) => {
  try {
    let data = await reservationsticketModel.findOne(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Get one Reservations Ticket successfully",
        results: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.createReservationsTicket = async (request, response) => {
  try {
    const user = await reservationsticketModel.insert(request.body)
    return response.json({
      success: true,
      message: `Created resevation tickets ${request.body.reservationId} successfully`,
      result: user,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updateReservationsTicket = async (request, response) => {
  try {
    const data = await reservationsticketModel.update(request.params.id, request.body)
    if (data) {
      return response.json({
        success: true,
        message: "Update reservation ticket successfully",
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.deleteReservationsTicket = async (request, response) => {
  try {
    const data = await reservationsticketModel.destroy(request.params.id)
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
