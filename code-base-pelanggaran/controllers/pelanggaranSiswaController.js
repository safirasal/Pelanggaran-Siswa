let pelanggaranSiswaModel = require("../models/index").pelanggaran_siswa
let detailPelanggaranSiswaModel = require("../models/index").detail_pelanggaran_siswa

exports.getData = async (request, response) => {
    let data = await pelanggaranSiswaModel.findAll({
        include: ["siswa", "user", {
            model: detailPelanggaranSiswaModel,
            as: "detail_pelanggaran_siswa",
            include: ["pelanggaran"]
        }]
    })
    return response.json(data)
}

exports.addData = (request, response) => {
    let newData = {
        waktu: request.body.waktu,
        id_siswa: request.body.id_siswa,
        id_user: request.body.id_user
    }

    // insert ke tabel pelanggaran_siswa
    pelanggaranSiswaModel.create(newData)
        .then(result => {
            let detail_pelanggaran_siswa = request.body.detail_pelanggaran_siswa
            // asumsinya detail_pelanggaran_siswa itu bertipe arry

            let id = result.id_pelanggaran_siswa
            for (let i = 0; i < detail_pelanggaran_siswa.length; i++) {
                detail_pelanggaran_siswa[i].id_pelanggaran_siswa = id
            }

            // inert ke tabel detail_pelanggaran_siswa
            detailPelanggaranSiswaModel.bulkCreate(detail_pelanggaran_siswa)
                // create -> insert 1 baris | bulkCreate -> insert banyak data secara langsung
                .then(result => {
                    return response.json({
                        message: `JIAKH data pelanggaran siswa berhasil ditambahkan`
                    })
                })
                .catch(error => {
                    return response.json({
                        message: error.message
                    })
                })

        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.updateData = async (request, response) => {
    let id = request.params.id_pelanggaran_siswa

    // define data yang diubah
    let newData = {
        waktu: request.body.waktu,
        id_siswa: request.body.id_siswa,
        id_user: request.body.id_user
    }

    // eksekusi update tabel pelanggaran_siswa
    pelanggaranSiswaModel.update(
        newData, { where: { id_pelanggaran_siswa: id } }
    )
        .then(async (result) => {
            // ada 2 detail -> 1 detail
            // kita hapus data detail yg lama
            // insert data detail yang baru

            // hapus semua detail berdasarkan id_pelanggaran
            await detailPelanggaranSiswaModel.destroy(
                {
                    where: {
                        id_pelanggaran_siswa: request.params.id_pelanggaran_siswa
                    }
                }

            )
            // ------------------------------------------

            // insert lg data terbaru
            let detail_pelanggaran_siswa = request.body.detail_pelanggaran_siswa
            let id = request.params.id_pelanggaran_siswa
            for (let i = 0; i < detail_pelanggaran_siswa.length; i++) {
                detail_pelanggaran_siswa[i].id_pelanggaran_siswa = id
            }

            // inert ke tabel detail_pelanggaran_siswa
            detailPelanggaranSiswaModel.bulkCreate(detail_pelanggaran_siswa)
                .then(result => {
                    return response.json({
                        message: `JIAKH data pelanggaran siswa berhasil ditambahkan`
                    })
                })
                .catch(error => {
                    return response.json({
                        message: error.message
                    })
                })

        })
        .catch(error => console.log(error))
}

exports.deleteData = (request, response) => {
    let id = request.params.id_pelanggaran_siswa

    // hapus tabel detail pelanggaran siswa dulu
    detailPelanggaranSiswaModel.destroy({
        where: {
            id_pelanggaran_siswa: id
        }
    })

        .then(result => {
            let id = request.params.id_pelanggaran_siswa

            // hapus data pelanggaran siswa
            pelanggaranSiswaModel.destroy({
                where: {
                    id_pelanggaran_siswa: id
                }
            })
                .then(result => {
                    return response.json({
                        message: `oks Data pelanggaran siswa berhasil dihapus`
                    })
                })
                .catch(error => {
                    return response.json({
                        message: error.message
                    })
                })
        })
        .catch(error => console.log(error))
}