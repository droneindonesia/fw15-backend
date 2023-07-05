const multer = require("multer")
const errorHandler = require("../helpers/errorHandler.helper")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const path = require("path")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => path.extname(file.originalname).slice("1"),
    public_id: () => {
      const randomNumber = Math.round(Math.random() * 5000)
      const name = `${new Date().getDate()}_${randomNumber}`
      return name
    },
  },
})

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/")
//     },
//     filename: (req, file, cb) => {
//         const explode = file.originalname.split(".").length
//         const ext = file.originalname.split(".")[explode - 1]
//         const filename = new Date().getTime().toString() + "." + ext
//         cb(null, filename)
//     },
// })

const limits = {
  fileSize: 1 * 1024 * 1024,
}

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" && file.mimetype !== "image/svg+xml") {
    cb(Error("fileformat_error"))
  }
  cb(null, true)
}

const upload = multer({ storage, limits, fileFilter })

const uploadMiddleware = (field) => {
  const uploadField = upload.single(field)
  return (req, res, next) => {
    uploadField(req, res, (err) => {
      try {
        if (err) {
          if (err.message === "fileformat_error") {
            throw Error("fileformat_error")
          }
          throw Error(err.message)
        }
        return next()
      } catch (err) {
        return errorHandler(res, err)
      }
    })
  }
}

module.exports = uploadMiddleware
