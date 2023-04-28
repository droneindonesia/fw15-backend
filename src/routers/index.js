const router = require("express").Router()
const authMiddleware = require("../middlewares/auth.middleware")

router.use("/auth", require("./auth/auth.router"))
router.use("/admin", authMiddleware, require("./admin/admin.router"))
router.use("/profile", authMiddleware, require("./profile.router"))
router.use("/cities", require("./city.router"))
router.use("/events", authMiddleware, require("./events.router"))
router.use("/categories", require("./categories.router"))
router.use("/partners", require("./partners.router"))
router.use("/reservations", require("./reservations.router"))
router.use("/payment", require("./payment.router"))
router.use("/changepassword", authMiddleware, require("./changepassword.router"))
router.use("/wishlist", authMiddleware, require("./wishlist.router.js"))

router.get("/", (request, response) => {
    return response.json({
        success: true,
        message: "Backend is running well"
    })
})

router.use("*", (request, response) => {
    return response.json({
        success: false,
        message: "Resources not found"
    })
})

module.exports = router
