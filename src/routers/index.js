const router = require("express").Router()
const authMiddleware = require("../middlewares/auth.middleware")

router.use("/auth", require("./auth/auth.router"))
router.use("/admin", authMiddleware, require("./admin/admin.router"))
router.use("/profile", authMiddleware, require("./profile.router"))
router.use("/cities", authMiddleware, require("./city.router"))
router.use("/events", require("./events.router"))
router.use("/history", authMiddleware, require("./history.router"))
router.use("/categories", authMiddleware, require("./categories.router"))
router.use("/partners", authMiddleware, require("./partners.router"))
router.use("/reservations", authMiddleware, require("./reservations.router"))
router.use("/payment", authMiddleware, require("./payment.router"))
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
