const wishlistModel = require("../../models/admin/wishlist.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllWishlist = async (request, response) => {
  try {
    const data = await wishlistModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      success: true,
      message: "List of all wishlists",
      results: data,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.getOneWishlist = async (request, response) => {
  try {
    let data = await wishlistModel.findOne(request.params.id)
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

exports.createWishlist = async (request, response) => {
  try {
    const user = await wishlistModel.insert(request.body)
    return response.json({
      success: true,
      message: `Created wishlists ${request.body.userId} successfully`,
      result: user,
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.updateWishlist = async (request, response) => {
  try {
    const data = await wishlistModel.update(request.params.id, request.body)
    if (data) {
      return response.json({
        success: true,
        message: "Update wishlists successfully",
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.deleteWishlist = async (request, response) => {
  try {
    const data = await wishlistModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `Delete wishlists ${request.params.id} successfully`,
        result: data,
      })
    } else {
      throw Error("not_found")
    }
  } catch (e) {
    errorHandler(response, e)
  }
}
