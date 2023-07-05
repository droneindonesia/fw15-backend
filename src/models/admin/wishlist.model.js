const db = require("../../helpers/db.helper")

const table = "wishlists"

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

exports.findOne = async function (id) {
  const query = `
  SELECT * FROM "${table}" WHERE id=$1
  `

  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.findOneById = async (userId) => {
  const query = `
  SELECT 
  "w"."id",
  "e"."title",
  "e"."date",
  "c"."name" AS "location",
  "w"."userId"
  FROM "${table}" "w"
  JOIN "events" "e" ON "e"."id" = "w"."eventId"
  JOIN "cities" "c" ON "c"."id" = "e"."cityId"
  WHERE "userId" = $1;
  `
  const values = [userId]
  const { rows } = await db.query(query, values)
  return rows
}

exports.insert = async function (data) {
  const query = `
  INSERT INTO "${table}" ("userId", "eventId") 
  VALUES ($1, $2) RETURNING *
  `

  const values = [data.userId, data.eventId]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.update = async function (id, data) {
  const query = `
  UPDATE "${table}" 
  SET "userId"=$2, "eventId"=$3
  WHERE "id" = $1
  RETURNING *
  `

  const values = [id, data.userId, data.eventId]
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
