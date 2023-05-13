const db = require("../../helpers/db.helper")

exports.findAll = async function (page, limit, sort, sortBy) {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    sort = sort || "id"
    sortBy = sortBy || "ASC"

    const offset = (page - 1) * limit
    const query = `
    SELECT * FROM "reservationsTickets" ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2
    `

    const values = [limit, offset]
    const { rows } = await db.query(query, values)

    return rows
}

exports.getInfo = async (id) => {
    const queries = `
    SELECT
    "e"."title" AS "eventName",
    "rs"."name" AS "TicketSection",
    "rs"."price" AS "price",
    "rt"."quantity" AS "quantity",
    "rsta"."name" AS "reservationStatus",
    "pm"."name" AS "paymentMethod"
    FROM "reservationsTickets" "rt"
    INNER JOIN "reservationSections" "rs" ON "rs"."id" = "rt"."sectionId"
    INNER JOIN "reservations" "r" ON "r"."id" = "rt"."reservationId"
    INNER JOIN "events" "e" ON "e"."id" = "r"."eventId"
    INNER JOIN "reservationStatus" "rsta" ON "rsta"."id" = "r"."statusId"
    INNER JOIN "paymentMethod" "pm" ON "pm"."id" = "r"."paymentMethodId"
    WHERE "r"."id" = $1
    `
    const values = [id]
    const { rows } = await db.query(queries, values)
    return rows[0]
}

exports.findOne = async function (id) {
    const query = `
    SELECT * FROM "reservationsTickets" WHERE id=$1
    `

    const values = [id]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "reservationsTickets" ("reservationId", "sectionId", "quantity") 
    VALUES ($1, $2, $3) RETURNING *
    `

    const values = [data.reservationId, data.sectionId, data.quantity]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "reservationsTickets" 
    SET "reservationId"=$2, "sectionId"=$3, "quantity"=$4
    WHERE "id" = $1
    RETURNING *
    `

    const values = [id, data.reservationId, data.sectionId, data.quantity]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "reservationsTickets" 
    WHERE "id"=$1
    RETURNING *
    `

    const values = [id]
    const { rows } = await db.query(query, values)
    return rows[0]
}
