var admin = require("firebase-admin")
const firebaseServiceAccount = require("../../firebase")

var serviceAccount = require(firebaseServiceAccount)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

module.exports = admin
