const express = require(`express`)
const app = express()

app.use(express.json()) // membaca data dalam format json

// call siswa controller
let siswaController = require("../controllers/siswaController")

// call testMiddleware
let testMiddleware = require("../middlewares/testMiddlewares")
let authorization = require("../middlewares/authorization")
let uploadImage = require("../middlewares/uploadImage")

// end-point get data siswa
app.get("/", [
    testMiddleware.middleware1,
    testMiddleware.middleware2,
    authorization.authorization
],
    siswaController.getDataSiswa)

// end-point add data siswa
app.post("/", [
    uploadImage.upload.single(`image`),
    authorization.authorization],
    siswaController.addDataSiswa)

// end-point edit data siswa
app.put("/:id_siswa", [
    uploadImage.upload.single(`image`),
    authorization.authorization],
    siswaController.editDataSiswa)

// end-point delete data siswa
app.delete("/:id_siswa", [
    authorization.authorization],
    siswaController.deleteDataSiswa)

module.exports = app