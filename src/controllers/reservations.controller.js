const reservationsModel = require("../models/admin/reservations.model")
const errorHandler = require("../helpers/errorHandler.helper")
const eventsModel = require("../models/admin/events.model")
const reservationsTicketModel = require("../models/admin/reservationsticket.model")

exports.getReservationSection = async (req, res) => {
  try {
    const { id } = req.user
    if (!id) {
      throw Error("Unauthorized")
    }

    const reservation = await reservationsModel.getReservations()
    return res.json({
      success: true,
      message: "Add reservations successfully",
      results: reservation,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

exports.createReservations = async (req, res) => {
  try {
    const { id } = req.user

    if (!id) {
      throw Error("Unauthorized")
    }

    const data = { userId: id, ...req.body }

    const checkEvent = await eventsModel.findOne(req.body.eventId)
    const { title } = checkEvent

    if (!checkEvent) {
      throw Error("Event is not found")
    }

    const reservation = await reservationsModel.insert(data)
    return res.json({
      success: true,
      message: "Add reservations successfully",
      results: { reservation, title },
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}

exports.makeTicket = async (req, res) => {
  try {
    const { id } = req.user

    if (!id) {
      throw Error("Unauthorized")
    }

    const data = { ...req.body }

    const reservation = await reservationsModel.findByIdAndUserId(id)

    if (!reservation) {
      throw Error("Reservation is not found")
    }

    const ticket = await reservationsTicketModel.insert(data)

    return res.json({
      success: true,
      message: "Add ticket successfully",
      results: ticket,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
