const db = require("../../helpers/db.helper")

exports.insert = async function (id, data) {
    const query = `
    INSERT INTO "devicetoken" 
    ("userId", "token") 
    VALUES ($1, $2) RETURNING *
    `

    const values = [id, data.token]
    const { rows } = await db.query(query, values)
    return rows[0]
}
