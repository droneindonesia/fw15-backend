require("dotenv").config({
    path: ".env"
})

const express = require("express")
const app = express()
app.use(express.urlencoded({extended: false}))
app.use("/uploads", express.static("uploads"))
const PORT = process.env.PORT

const cors = require("cors")

app.use(cors({
    origin: "https://fahmi-fw15-frontend.vercel.app",
    optionsSuccessStatus: 200
}))

app.use("/", require("./src/routers/index"))

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
})
