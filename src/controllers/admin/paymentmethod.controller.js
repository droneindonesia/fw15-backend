const paymentMethodModel = require("../../models/admin/paymentmethod.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllPaymentMethod = async (request, response) => {
  try {
    const data = await paymentMethodModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      success: true,
      message: "List of all payment method",
      results: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.getOnePaymentMethod = async (request, response) => {
  try {
    let data = await paymentMethodModel.findOne(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Get one payment method successfully",
        results: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.createPaymentMethod = async (request, response) => {
  try {
    const data = await paymentMethodModel.insert(request.body)
    return response.json({
      success: true,
      message: `Created payment method ${request.body.name} successfully`,
      result: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updatePaymentMethod = async (request, response) => {
  try {
    const data = await paymentMethodModel.update(request.params.id, request.body)
    if (data) {
      return response.json({
        success: true,
        message: "Update payment method successfully",
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.deletePaymentMethod = async (request, response) => {
  try {
    const data = await paymentMethodModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `Delete payment method ${request.params.id} successfully`,
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}
