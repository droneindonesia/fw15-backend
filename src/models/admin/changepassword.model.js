const db = require("../../helpers/db.helper")

exports.changePassword = async function (userId, newPassword) {
    const query = `
    UPDATE "users" SET "password"=$2 WHERE id=$1
    `

    const values = [userId, newPassword]
    const { rows } = await db.query(query, values)
    return rows[0]
}
