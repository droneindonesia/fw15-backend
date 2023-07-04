var admin = require("firebase-admin")

var serviceAccount = require("../../eventpraga-5a642-firebase-adminsdk-yecs6-1cfcaadcd3.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

module.exports = admin
