const db = require("../../helpers/db.helper")

exports.findAll = async function(page, limit, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    
    const offset = (page - 1) * limit
    const query = `
    SELECT * FROM "reservations" ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2
    `

    const values = [limit, offset]
    const {rows} = await db.query(query, values)

    return rows
}

exports.findOne = async function(id){
    const query = `
    SELECT * FROM "reservations" WHERE id=$1
    `

    const values = [id]
    const {rows} = await db.query(query, values)  
    return rows[0]
}

exports.findAllByUserId = async (userId) => {
    const query = `
    SELECT 
    "events"."id" as "eventId",
    "users"."id" as "userId",
    "events"."title",
    "events"."date",
    "events"."cityId",
    "events"."description",
    "events"."createdBy",
    "reservationStatus"."id" as "statusId",
    "reservationStatus"."name" as "statusName",
    "paymentMethod"."id" as "paymentMethodId",
    "paymentMethod"."name" as "paymentMethodName",
    "reservations"."createdAt",
    "reservations"."updatedAt"
    FROM "reservations" 
    JOIN "events" ON "events"."id" = "reservations"."eventId"
    JOIN "users" ON "users"."id" = "reservations"."userId"
    JOIN "reservationStatus" ON "reservationStatus"."id" = "reservations"."statusId"
    JOIN "paymentMethod" ON "paymentMethod"."id" = "reservations"."paymentMethodId"
    WHERE "reservations"."userId"=$1
    `
    const values = [userId]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.insert = async function(data){
    const query = `
    INSERT INTO "reservations" ("eventId", "userId", "statusId", "paymentMethodId") 
    VALUES ($1, $2, $3, $4) RETURNING *
    `

    const values = [data.eventId, data.userId, data.statusId, data.paymentMethodId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function(id, data){
    const query = `
    UPDATE "reservations" 
    SET "eventId"=$2, "userId"=$3 "statusId"=$4, "paymentMethodId"=$5
    WHERE "id" = $1
    RETURNING *
    `

    const values = [id, data.eventId, data.userId, data.statusId, data.paymentMethodId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.updateByUserId = async (userId, data) => {
    const query = `
    UPDATE "reservations" 
    SET 
    "statusId"=$2,
    "paymentMethodId"=$3
    WHERE "userId"=$1
    RETURNING *;
  `
    const values = [userId, data.statusId, data.paymentMethodId]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function(id){
    const query = `
    DELETE FROM "reservations" 
    WHERE "id"=$1
    RETURNING *
    `

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
