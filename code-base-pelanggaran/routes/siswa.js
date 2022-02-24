const express = require(`express`)
const app = express()

app.use(express.json()) // membaca data dalam format json

// call siswa controller
let siswaController = require("../controllers/siswaController")

// call testMiddleware
let testMiddleware = require("../middlewares/testMiddlewares")
let authorization = require("../middlewares/authorization")

// end-point get data siswa
app.get("/", [
    testMiddleware.middleware1, 
    testMiddleware.middleware2,
    authorization.authorization
], 
    siswaController.getDataSiswa)

// end-point add data siswa
app.post("/", testMiddleware.middleware1, siswaController.addDataSiswa)

// end-point edit data siswa
app.put("/:id_siswa", siswaController.editDataSiswa)

// end-point delete data siswa
app.delete("/:id_siswa", siswaController.deleteDataSiswa)

module.exports = app