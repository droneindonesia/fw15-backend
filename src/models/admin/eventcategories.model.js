const db = require("../../helpers/db.helper")

exports.findAll = async function (page, limit, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit
    const query = `
    SELECT * FROM "eventCategories" ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2
    `

    const values = [limit, offset]
    const { rows } = await db.query(query, values)

    return rows
}

exports.findOne = async function (id) {
    const query = `
    SELECT * FROM "eventCategories" WHERE id=$1
    `

    const values = [id]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "eventCategories" ("eventId", "categoryId") 
    VALUES ($1, $2) RETURNING *
    `

    const values = [data.eventId, data.categoryId]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "eventCategories" 
    SET "eventId"=$2, "categoryId"=$3
    WHERE "id" = $1
    RETURNING *
    `

    const values = [id, data.eventId, data.categoryId]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "eventCategories" 
    WHERE "id"=$1
    RETURNING *
    `

    const values = [id]
    const { rows } = await db.query(query, values)
    return rows[0]
}
