var admin = require("firebase-admin")

var serviceAccount = require("../../firebase")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

module.exports = admin
