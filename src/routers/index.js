const router = require("express").Router()
const authMiddleware = require("../middlewares/auth.middleware")

router.use("/auth", require("./auth/auth.router"))
router.use("/admin", authMiddleware, require("./admin/admin.router"))
router.use("/profile", authMiddleware, require("./profile.router"))

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