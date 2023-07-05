const db = require("../../helpers/db.helper")

const table = "devicetoken"

exports.findAll = async function (page, limit, sort, sortBy) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 5
  sort = sort || "id"
  sortBy = sortBy || "ASC"

  const offset = (page - 1) * limit
  const query = `
  SELECT * FROM "${table}" 
  ORDER BY ${sort} ${sortBy} 
  LIMIT $1 OFFSET $2
  `

  const values = [limit, offset]
  const { rows } = await db.query(query, values)

  return rows
}

exports.insert = async function (id, data) {
  const query = `
  INSERT INTO "${table}" 
  ("userId", "token") 
  VALUES ($1, $2) RETURNING *
  `

  const values = [id, data.token]
  const { rows } = await db.query(query, values)
  return rows[0]
}
