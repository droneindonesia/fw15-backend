const errorHandler = (response, e) => {
  if (e?.message?.includes("not_found")) {
    return response.status(404).json({
      success: false,
      message: "Error , data is not found",
    })
  } else if (e?.message?.includes("wrong_credentials")) {
    return response.status(400).json({
      success: false,
      message: "Wrong credentials",
    })
  } else if (e?.message?.includes("authorization")) {
    return response.status(401).json({
      success: false,
      message: "Wrong authorization",
    })
  } else if (e?.message?.includes("no_user")) {
    return response.status(404).json({
      success: false,
      message: "Users not found",
    })
  } else if (e?.message?.includes("no_forgot_request")) {
    return response.status(404).json({
      success: false,
      message: "Error, email not found",
    })
  } else if (e?.message?.includes("jwt malform")) {
    return response.status(400).json({
      success: false,
      message: "Token is invalid",
    })
  } else if (e?.message?.includes("invalid signature")) {
    return response.status(400).json({
      success: false,
      message: "Token signature is invalid",
    })
  } else if (e?.message?.includes("event is not found")) {
    return response.status(404).json({
      success: false,
      message: "Can't make wishlist because event is not found",
    })
  } else if (e?.message?.includes("wrong_password")) {
    return response.status(400).json({
      success: false,
      message: "Wrong email or password",
    })
  } else if (e?.message?.includes("forgot_failed")) {
    return response.status(400).json({
      success: false,
      message: "No forgot password request",
    })
  } else if (e?.message?.includes("Unauthorized")) {
    return response.status(401).json({
      success: false,
      message: "Unauthorized",
    })
  } else if (e?.message?.includes("No_email")) {
    return response.status(404).json({
      success: false,
      message: "Email is not found",
    })
  } else if (e?.message?.includes("Reservation is not found")) {
    return response.status(404).json({
      success: false,
      message: "Reservation is not found",
    })
  } else if (e?.message?.includes("Code is invalid")) {
    return response.status(404).json({
      success: false,
      message: "Code is invalid",
    })
  } else if (e?.message?.includes("Update profile failed")) {
    return response.status(404).json({
      success: false,
      message: "Profile was failed to update because not found",
    })
  } else if (e?.message?.includes("profile_not_found")) {
    return response.status(404).json({
      success: false,
      message: "Profile not found",
    })
  } else if (e?.message?.includes("already in use")) {
    return response.status(404).json({
      success: false,
      message: "Email is already in use",
    })
  } else if (e?.message?.includes("unauthorized")) {
    return response.status(404).json({
      success: false,
      message: "Unauthorized, you must login first",
    })
  } else if (e?.message?.includes("Event is not found")) {
    return response.status(404).json({
      success: false,
      message: "Event is not found",
    })
  } else if (e?.message?.includes("Can't make wishlist because event is not found")) {
    return response.status(404).json({
      success: false,
      message: "Can't make wishlist because event is not found",
    })
  } else {
    console.log(e)
    return response.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

module.exports = errorHandler
