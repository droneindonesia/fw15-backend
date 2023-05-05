const db = require("../../helpers/db.helper")

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    
    const offset = (page - 1) * limit
    const query = `
    SELECT * FROM "events" WHERE title LIKE $3 ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2
    `

    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)

    return rows
}

exports.findEventsByUser = async function(id){
    const query = `
    SELECT
      "e"."id",
      "e"."picture",
      "e"."title",
      "c"."name" AS "location",
      "e"."date",
      "e"."description"
      FROM "events" "e"
      JOIN "cities" "c" ON "c"."id" = "e"."cityId"
      WHERE "e"."id" = $1
    `

    const values = [id]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.findOne = async function(id){
    const query = `
    SELECT * FROM "events" WHERE id=$1
    `

    const values = [id]
    const {rows} = await db.query(query, values)  
    return rows[0]
}

exports.insert = async function(data){
    const query = `
    INSERT INTO "events" ("picture", "title", "date", "cityId", "description") 
    VALUES ($1, $2, $3, $4, $5) RETURNING *
    `

    const values = [data.picture, data.title, data.date, data.cityId, data.description]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function(id, data){
    const query = `
    UPDATE "events" 
    SET "picture"=$2, "title"=$3, "date"=$4, "cityId"=$5, "description"=$6
    WHERE "id" = $1
    RETURNING *
    `

    const values = [id, data.picture, data.title, data.date, data.cityId, data.description]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function(id){
    const query = `
    DELETE FROM "events" 
    WHERE "id"=$1
    RETURNING *
    `

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
