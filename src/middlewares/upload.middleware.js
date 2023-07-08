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
    folder: 'ItmamulFahmi',
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => {
      const filename = new Date().getTime().toString()
      return filename
    }
  }
})

const limits = {
  fileSize: 1 * 2048 * 4096,
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
