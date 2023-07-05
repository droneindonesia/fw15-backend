const db = require("../../helpers/db.helper")

const table = "eventCategories"

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

exports.insert = async function (data) {
  const query = `
  INSERT INTO "${table}" ("eventId", "categoryId") 
  VALUES ($1, $2) RETURNING *
  `

  const values = [data.eventId, data.categoryId]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.update = async function (data) {
  const query = `
  UPDATE "${table}" 
  SET "categoryId"=$2
  WHERE "eventId" = $1
  RETURNING *
  `

  const values = [data.eventId, data.categoryId]
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
