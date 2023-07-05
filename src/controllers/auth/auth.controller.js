const usersModel = require("../../models/admin/users.model")
const errorHandler = require("../../helpers/errorHandler.helper")
const jwt = require("jsonwebtoken")
const { APP_SECRET } = process.env
const argon = require("argon2")
const profileModel = require("../../models/admin/profile.model")
const forgotRequestModel = require("../../models/admin/forgotrequest.model")

exports.login = async (request, response) => {
  try {
    const { email, password } = request.body
    const user = await usersModel.findOneByEmail(email)
    if (!user) {
      throw Error("No_email")
    }
    const verify = await argon.verify(user.password, password)
    if (!verify) {
      throw Error("wrong_password")
    }
    const token = jwt.sign({ id: user.id }, APP_SECRET)
    return response.json({
      success: true,
      message: "Login success!",
      results: { token },
    })
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.register = async (request, response) => {
  try {
    const fullName = request.body.fullName
    const username = request.body.fullName
    const password = request.body.password
    const checkEmail = await usersModel.findOneByEmail(request.body.email)

    if (checkEmail) {
      throw Error("Email is already in use")
    }

    const hash = await argon.hash(password)
    const data = {
      ...request.body,
      username,
      password: hash,
    }
    const user = await usersModel.insert(data)
    const profileData = {
      fullName,
      userId: user.id,
    }
    await profileModel.insert(profileData)
    const token = jwt.sign({ id: user.id }, APP_SECRET)
    return response.json({
      success: true,
      message: "Register success!, you'll be redirected in seconds",
      results: { token },
    })
  } catch (e) {
    errorHandler(response, e)
  }
}

exports.forgotPassword = async (request, response) => {
  try {
    const { email } = request.body
    const user = await usersModel.findOneByEmail(email)
    if (!user) {
      throw Error("no_user")
    }
    const randomNumber = Math.random()
    const rounded = Math.round(randomNumber * 100000)
    const padded = String(rounded).padEnd(6, "0")

    const forgot = await forgotRequestModel.insert({
      email: user.email,
      code: padded,
    })
    if (!forgot) {
      throw Error("forgot_failed")
    }
    return response.json({
      success: true,
      message: "Request reset password successfully",
    })
  } catch (e) {
    return errorHandler(response, e)
  }
}

exports.resetPassword = async (request, response) => {
  try {
    const { code, email, password } = request.body
    const find = await forgotRequestModel.findOneByCodeAndEmail(email, code)
    const checkCode = await forgotRequestModel.findOneByCode(code)

    if (!checkCode) {
      throw Error("Code is invalid")
    }

    if (!find) {
      throw Error("no_forgot_request")
    }
    const selectedUser = await usersModel.findOneByEmail(email)
    const data = {
      password: await argon.hash(password),
    }
    const user = await usersModel.update(selectedUser.id, data)
    if (!user) {
      throw Error("no_forgot_request")
    }
    await forgotRequestModel.destroy(find.id)
    return response.json({
      success: true,
      message: "Reset password successfully",
    })
  } catch (e) {
    return errorHandler(response, e)
  }
}
