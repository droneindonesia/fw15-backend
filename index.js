require("dotenv").config({
    path: ".env"
})

const express = require("express")
const app = express()
app.use(express.urlencoded({extended: false}))
const PORT = process.env.PORT

app.use("/", require("./src/routers/index"))

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
})
