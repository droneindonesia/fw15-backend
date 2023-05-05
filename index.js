require("dotenv").config({
    path: ".env"
})

const express = require("express")
const app = express()
app.use(express.urlencoded({extended: false}))
const PORT = process.env.PORT

const cors = require("cors")

app.use(cors({
    origin: "https://localhost:5173/",
    optionsSuccessStatus: 200
}))

app.use("/", require("./src/routers/index"))

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
})
