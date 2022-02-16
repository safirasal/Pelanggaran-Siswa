const req = require("express/lib/request")

// memanggil file model untuk siswa
let modelSiswa = require("../models/index").siswa

exports.getDataSiswa = (request, response) => {
    modelSiswa.findAll()
    .then(result =>{
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.addDataSiswa = (request, response) => {
    // tampung data request
    let newSiswa = {
        nama: request.body.nama,
        kelas: request.body.kelas,
        poin: request.body.poin,
        nis: request.body.nis
    }

    modelSiswa.create(newSiswa)
    .then(result => {
        return response.json({
            message: `Data siswa berhasil ditambahkan`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.editDataSiswa = (request, response) => {
    let id_siswa = request.params.id_siswa
    return response.json({
        message : `This function for edit data siswa with ID ${id_siswa}`
    })
}

exports.deleteDataSiswa = (request, response) => {
    let id_siswa = request.params.id_siswa
    return response.json({
        message : `This function for delete data siswa with ID ${id_siswa}`
    })
}