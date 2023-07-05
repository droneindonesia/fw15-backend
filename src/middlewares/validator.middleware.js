const { body, param, query, validationResult } = require("express-validator")
const usersModel = require("../models/admin/users.model")
const fileRemover = require("../helpers/fileremover.helper")

const emailFormat = body("email").isEmail().withMessage("Email is invalid")
const checkPassword = body("password").isLength({ min: 1 }).isStrongPassword().withMessage("Password is invalid")
const checkDuplicateEmail = body("email").custom(async (value) => {
  const email = await usersModel.findOneByEmail(value)
  if (email) {
    throw new Error("Email is already in use")
  }
})

const checkDuplicateUsername = body("username").custom(async (value) => {
  const user = await usersModel.findOneByUsername(value)
  if (user) {
    throw new Error("Username is already in use")
  }
})

const checkDuplicatePass = body("confirmPassword").custom((value, { req }) => {
  return value === req.body.password
})

const rules = {
  authLogin: [emailFormat, checkPassword],
  authRegister: [checkDuplicateUsername, emailFormat, checkPassword, checkDuplicateEmail, checkDuplicatePass],
  categories: [body("name").matches(/\d/).withMessage("name should be string")],
  cities: [
    body("name").optional().isString().withMessage("Name should be string"),
    body("lat").optional().isInt().withMessage("Latitude should be a number"),
    body("long").optional().isInt().withMessage("Longitude should be a number"),
  ],
  profile: [
    body("phoneNumber").optional().isMobilePhone().withMessage("Please enter phone number correctly"),
    body("profession").optional().isString().withMessage("Profession should be a string"),
    body("nationality").optional().isString().withMessage("Nationality should be a string"),
    body("birthDate").optional().isDate().withMessage("Input type is invalid for birth date"),
  ],
  eventcategories: [
    body("eventId").optional().isInt().withMessage("Event id should be a number"),
    body("categoryId").optional().isInt().withMessage("category id should be a number"),
  ],
  events: [
    body("title").optional().isString().withMessage("Title should be a number"),
    body("date").optional().isDate().withMessage("Invalid input type for date"),
    body("cityId").optional().isInt().withMessage("City Id shoule be a number"),
    body("description").optional().isString().withMessage("Description should be a string"),
  ],
  partners: [body("name").optional().isString().withMessage("Name should be a string")],
  paymentmethod: [
    body("reservationId").optional().isInt().withMessage("Reservation ID should be a number"),
    body("paymentMethodId").optional().isInt().withMessage("Payment method ID should be a number"),
  ],
  reservations: [
    body("eventId").optional().isInt().withMessage("Event Id should be a number"),
    body("statusId").optional().isInt().withMessage("Status Id should be a number"),
    body("paymentMethodId").optional().isInt().withMessage("Payment method id should be a number"),
  ],
  reservationsection: [
    body("name").optional().isString().withMessage("Name should be a string"),
    body("price").optional().isInt().withMessage("Price should be a string"),
  ],
  reservationstatus: [param("id").optional().isInt().withMessage("id should be a number")],
  reservationsticket: [
    body("reservationId").optional().isInt().withMessage("Reservation ID should be a number"),
    body("sectionId").optional().isInt().withMessage("Section ID should be a number"),
    body("quantity").optional().isInt().withMessage("Quantity should be a number"),
  ],
  users: [
    body("email").optional().isEmail().withMessage("Invalid type for email"),
    body("password").optional().isStrongPassword().withMessage("Invalid type for password"),
    checkDuplicateEmail,
  ],
  wishlists: [
    body("userid").optional().isInt().withMessage("userId Should be a number"),
    body("eventId").optional().isInt().withMessage("Event Id should be a number"),
  ],
  manageWishlist: [body("eventId").optional().isInt().withMessage("event ID should be a number")],
  forgotPassword: [body("email").optional().isEmail().withMessage("Invalid input type for email")],
  resetPassword: [
    body("code").optional().isInt().withMessage("Code is invalid"),
    body("email").optional().isEmail().withMessage("Incorrect email"),
    body("password").optional().isStrongPassword().withMessage("Password invalid"),
    checkDuplicatePass,
  ],
  changePassword: [
    body("oldPassword").optional().isStrongPassword().withMessage("Password is invalid"),
    body("newPassword").optional().isStrongPassword().withMessage("Password invalid"),
    body("confirmPassword").custom((value, { req }) => {
      return value === req.body.newPassword
    }),
  ],
  getAll: [
    query("page")
      .isInt()
      .withMessage("Page should be a number")
      .optional({ values: "undefined" | "null" | "falsy" }),
    query("limit").isInt().withMessage("Limit should be a number").optional(),
    query("sortBy").isIn(["ASC", "DESC"]).withMessage("Input is invalid").optional(),
  ],
  getOne: [param("id").optional().isInt().withMessage("id should be a number")],
  Update: [param("id").optional().isInt().withMessage("id should be a number")],
  Delete: [param("id").optional().isInt().withMessage("id should be number")],
}

const validator = (req, res, next) => {
  const errors = validationResult(req)
  try {
    if (!errors.isEmpty()) {
      fileRemover(req.file)
      throw Error("Validation rules")
    }
    return next()
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      results: errors.array(),
    })
  }
}

const validate = (selectedrules) => [rules[selectedrules], validator]

module.exports = validate
