const db = require("../../helpers/db.helper")

const table = "notification"

exports.findAll = async function () {
  const query = `
  SELECT * FROM "${table}"
  `

  const { rows } = await db.query(query)
  return rows
}

exports.insert = async function (data) {
  const query = `
  INSERT INTO "${table}" ("title", "body") 
  VALUES ($1, $2) RETURNING *
  `

  const values = [data.title, data.body]
  const { rows } = await db.query(query, values)
  return rows[0]
}
