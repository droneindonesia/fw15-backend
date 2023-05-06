require("dotenv").config()
const multer = require("multer")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const path = require("path")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        format: async (req, file) => path.extname(file.originalname).slice("1"),
        public_id: () => "computed-filename-using-request",
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
//     }
// })

const limits = {
    fileSize: 1 * 1024 * 1024
}

const fileFilter = (req, file, cb) => {
    if(file.mimetype !== "images/jpeg"/*  || file.mimetype !== "image/svg+xml" */){
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
