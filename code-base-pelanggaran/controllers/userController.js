const req = require("express/lib/request")
let md5 = require("md5")
let jwt = require('jsonwebtoken')

const {validationResult} = require(`express-validator`)
const { request, response } = require("express")

// memanggil file model untuk User
let modelUser = require("../models/index").user


exports.getDataUser = (request, response) => {
    modelUser.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.findUser = async (request, response) => {
    let keyword = request.body.keyword

    /** import sequelize operator */
    let sequelize = require(`sequelize`)
    let Op = sequelize.Op
    /**
     * query = select * from user where username like "%keyword%" or
     * nama_user like "%keyword%"
     */
    let dataUser = await modelUser.findAll({
        where: {
            [Op.or] : {
                username: { [Op.like] : `%${keyword}%`},
                nama_user: { [Op.like] : `%${keyword}%`}
            }
        }
    })
    return response.json(dataUser)
}

exports.addDataUser = (request, response) => {
    let error = validationResult(request)
    if(!error.isEmpty()){
        return response.json(error.array())
    }

    // tampung data request
    let newUser = {
        nama_user: request.body.nama_user,
        username: request.body.username,
        password:  md5(request.body.password)
    }

    modelUser.create(newUser)
    .then(result => {
        return response.json({
            message: `JIAKH Data user berhasil ditambahkan`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.editDataUser = (request, response) => {
    let id = request.params.id_user
    let dataUser = {
        nama_user: request.body.nama_user,
        username: request.body.username,
        password: md5(request.body.password)
    }

    modelUser.update(dataUser, { where: {id_user: id} })
    .then(result => {
        return response.json({
            message: `JIAKH Data user berhasil diubah`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.deleteDataUser = (request, response) => {
    let id = request.params.id_user

    modelUser.destroy({where: {id_user: id}})
    .then(result => {
        return response.json({
            message: `JIAKH Data user berhasil dihapus`
        })
    })   
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.authentication = async(request, response) => {
    let data = {
        username: request.body.username,
        password: md5(request.body.password)
    }

    // validasi (cek data di tabel user)
    let result = await modelUser.findOne({where: data})

    if (result) {
        // data ditemukan

        // payload adalah data/informasi yang akan dienkripsi
        let payload = JSON.stringify(result) // konversi dari bentuk objek ke JSON
        let secretKey = `Sequelize itu sangat menyenangkan`

        // generate token
        let token = jwt.sign(payload, secretKey)
        return response.json({
            logged: true,
            token: token
        })
    }else{
        // data tidak ditemukan
        return response.json({
            logged : false,
            message: `Who the fuck are you?`
        })
    }
}