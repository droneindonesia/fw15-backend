var admin = require("firebase-admin")

var serviceAccount = require("../../eventpraga-f4b4d-firebase-adminsdk-p87vd-37c2c01bb2.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

module.exports = admin
