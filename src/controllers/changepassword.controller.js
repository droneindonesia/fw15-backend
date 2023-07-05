const errorHandler = require("../helpers/errorHandler.helper")
const changePasswordModel = require("../models/admin/changepassword.model")
const argon = require("argon2")
const usersModel = require("../models/admin/users.model")

exports.changePassword = async (req, res) => {
  try {
    const { id } = req.user
    let { password } = await usersModel.findOne(id)
    const { oldPassword } = req.body
    const newPassword = await argon.hash(req.body.newPassword)
    const verify = await argon.verify(password, oldPassword)
    if (!verify) {
      throw Error("wrong_credentials")
    }
    let user = await changePasswordModel.changePassword(id, newPassword)
    return res.json({
      success: true,
      message: "Password updated successfully",
      results: user,
    })
  } catch (err) {
    return errorHandler(res, err)
  }
}
