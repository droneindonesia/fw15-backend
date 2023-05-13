const admin = require("express").Router()

admin.use("/profile", require("./profile.router"))
admin.use("/categories", require("./categories.router"))
admin.use("/cities", require("./cities.router"))
admin.use("/eventcategories", require("./eventcategories.router"))
admin.use("/events", require("./events.router"))
admin.use("/partners", require("./partners.router"))
admin.use("/paymentmethod", require("./paymentmethod.router"))
admin.use("/profile", require("./profile.router"))
admin.use("/reservations", require("./reservations.router"))
admin.use("/reservationsection", require("./reservationsection.router"))
admin.use("/reservationstatus", require("./reservationstatus.router"))
admin.use("/reservationsticket", require("./reservationsticket.router"))
admin.use("/users", require("./users.router"))
admin.use("/wishlists", require("./wishlist.router"))

module.exports = admin
