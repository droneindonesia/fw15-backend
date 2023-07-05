const router = require("express").Router()
const authMiddleware = require("../middlewares/auth.middleware")

router.use("/auth", require("./auth/auth.router"))
router.use("/admin", authMiddleware, require("./admin/admin.router"))
router.use("/profile", authMiddleware, require("./profile.router"))
router.use("/cities", require("./city.router"))
router.use("/events", require("./events.router"))
router.use("/history", authMiddleware, require("./history.router"))
router.use("/categories", require("./categories.router"))
router.use("/partners", require("./partners.router"))
router.use("/reservations", authMiddleware, require("./reservations.router"))
router.use("/payment", authMiddleware, require("./payment.router"))
router.use("/changepassword", authMiddleware, require("./changepassword.router"))
router.use("/wishlist", authMiddleware, require("./wishlist.router.js"))
router.use("/device-token", authMiddleware, require("./deviceToken.router"))

router.get("/", (request, response) => {
  return response.status(200).json({
    success: true,
    message: "Backend is running well",
  })
})

router.use("*", (request, response) => {
  return response.status(400).json({
    success: false,
    message: "Resources not found",
  })
})

module.exports = router
