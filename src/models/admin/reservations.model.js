const db = require("../../helpers/db.helper")

const table = "reservations"

exports.findAll = async function (page, limit, sort, sortBy) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 5
  sort = sort || "id"
  sortBy = sortBy || "ASC"

  const offset = (page - 1) * limit
  const query = `
  SELECT * FROM "${table}" ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2
  `

  const values = [limit, offset]
  const { rows } = await db.query(query, values)

  return rows
}

exports.getReservations = async function () {
  const query = `
  SELECT * FROM "reservationSections"
  `

  const { rows } = await db.query(query)
  return rows
}

exports.findOne = async function (id) {
  const query = `
  SELECT * FROM "${table}" WHERE "userId"=$1
  `

  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.findOneByUserId = async (userId) => {
  const query = `
  SELECT
  "r"."id",
  "e"."title",
  "c"."name",
  "e"."date"
  FROM "${table}" "r"
  INNER JOIN "events" "e" ON "e"."id" = "r"."eventId"
  INNER JOIN "cities" "c" ON "c"."id" = "e"."cityId"
  WHERE "r"."userId" = $1
  `
  const values = [userId]
  const { rows } = await db.query(query, values)
  return rows
}

exports.findByIdAndUserId = async (userId) => {
  const queries = `
  SELECT * FROM "${table}"
  WHERE "userId" = $1
  `
  const values = [userId]
  const { rows } = await db.query(queries, values)
  return rows[0]
}

exports.insert = async function (data) {
  const query = `
  INSERT INTO "${table}" ("eventId", "userId", "statusId", "paymentMethodId") 
  VALUES ($1, $2, $3, $4) RETURNING *
  `

  const values = [data.eventId, data.userId, data.statusId, data.paymentMethodId]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.update = async function (id, data) {
  const query = `
  UPDATE "${table}" 
  SET "eventId"=$2, "userId"=$3 "statusId"=$4, "paymentMethodId"=$5
  WHERE "id" = $1
  RETURNING *
  `

  const values = [id, data.eventId, data.userId, data.statusId, data.paymentMethodId]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.updateByUserId = async (userId, data) => {
  const query = `
  UPDATE "${table}" 
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

exports.destroy = async function (id) {
  const query = `
  DELETE FROM "${table}" 
  WHERE "id"=$1
  RETURNING *
  `

  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}
