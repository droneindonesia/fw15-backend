const db = require("../../helpers/db.helper")

const table = "events"

exports.findAll = async function (page, limit, search, sort, sortBy, category, location) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 5
  search = search || ""
  sort = sort || "id"
  sortBy = sortBy || "ASC"
  category = category || ""
  location = location || ""

  const offset = (page - 1) * limit
  const query = `
  SELECT
  "e"."id",
  "e"."picture",
  "e"."title",
  "e"."date",
  "c"."name" as "category",
  "city"."name" as "location"
  FROM "eventCategories" "ec"
  JOIN "events" "e" ON "e"."id" = "ec"."eventId"
  JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
  JOIN "cities" "city" ON "city"."id" = "e"."cityId"
  WHERE "e"."title" LIKE $3 AND "c"."name" LIKE $4 AND "city"."name" LIKE $5
  ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
  `

  const values = [limit, offset, `%${search}%`, `%${category}%`, `%${location}%`]
  const { rows } = await db.query(query, values)

  return rows
}

exports.findAllByUserId = async function (page, limit, search, sort, sortBy, category, location, id) {
  page = parseInt(page) || 1
  limit = parseInt(limit) || 5
  search = search || ""
  sort = sort || "id"
  sortBy = sortBy || "ASC"
  category = category || ""
  location = location || ""

  const offset = (page - 1) * limit
  const query = `
  SELECT
  "e"."id",
  "e"."picture",
  "e"."title",
  "e"."date",
  "c"."name" as "category",
  "city"."name" as "location"
  FROM "eventCategories" "ec"
  JOIN "events" "e" ON "e"."id" = "ec"."id"
  JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
  JOIN "cities" "city" ON "city"."id" = "e"."cityId"
  WHERE "e"."title" LIKE $3 AND "c"."name" LIKE $4 AND "city"."name" LIKE $5 AND "e"."createdBy" = $6
  ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
  `

  const values = [limit, offset, `%${search}%`, `%${category}%`, `%${location}%`, id]
  const { rows } = await db.query(query, values)

  return rows
}

exports.findOne = async function (id) {
  const query = `
  SELECT 
  "e"."id",
  "e"."picture",
  "e"."title",
  "e"."date",
  "e"."description",
  "ci"."name" AS "location",
  "cat"."name" AS "category"
  FROM "eventCategories" "ec"
  JOIN "events" "e" ON "e"."id" = "ec"."eventId"
  JOIN "categories" "cat" ON "cat"."id" = "ec"."categoryId"
  JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
  WHERE "e"."id" = $1;
  `

  const values = [id]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.insert = async function (data) {
  const query = `
  INSERT INTO "${table}" ("picture", "title", "date", "cityId", "description", "createdBy") 
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
  `

  const values = [data.picture, data.title, data.date, data.cityId, data.description, data.createdBy]
  const { rows } = await db.query(query, values)
  return rows[0]
}

exports.update = async function (id, userId, data) {
  const query = `
  UPDATE "${table}"
  SET
  "picture"=COALESCE(NULLIF($2, ''), "picture"),
  "title"=COALESCE(NULLIF($3, ''), "title"),
  "date"=COALESCE(NULLIF($4::DATE, NULL), "date"),
  "cityId"=COALESCE(NULLIF($5::INTEGER, NULL), "cityId"),
  "description"=COALESCE(NULLIF($6, ''), "description"),
  "createdBy"=COALESCE(NULLIF($7::INTEGER, NULL), "createdBy")
  WHERE "id" = $1
  RETURNING *
  `

  const values = [id, data.picture, data.title, data.date, data.cityId, data.description, userId]
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
