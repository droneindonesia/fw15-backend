const multer = require("multer")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const path = require("path")
const {CLOUD_NAME, API_KEY, API_SECRET} = process.env

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "UPLOADS",
        format: async (file) => path.extname(file.originalname).slice("1"),
        public_id: () => {
            const randomNumber = Math.round(Math.random() * 90000)
            const name = `${new Date().getDate()}_${randomNumber}`
            return name
        },
    }
})

const limits = {
    fileSize: 1 * 1024 * 1024
}

const fileFilter = (req, file, cb) => {
    if(file.mimetype !== "image/jpeg"){
        cb(Error("fileformat_error"))
    }
    cb(null, true)
}

const upload = multer({storage, limits, fileFilter})

const uploadMiddleware = (field) => {
    const uploadField = upload.single(field)
    return (req, res, next) => {
        uploadField(req, res, (err) => {
            if(err){
                if(err.message === "fileformat_error"){
                    return res.status(400).json({
                        success: false,
                        message: "File format invalid"
                    })
                }
                return res.status(400).json({
                    success: false,
                    message: "File too large",
                    error: err
                })
            }
            return next()
        })
    }
}

module.exports = uploadMiddleware
