const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "./image")
        // config untuk menentukan folder penyimpanan
    }, 
    filename: (request, file, callback) => {
        callback(null, `image-${Date.now()}${path.extname(file.originalname)}`)
        // untuk menentukan nama file yang diupload
    }
})

exports.upload = multer({storage: storage})