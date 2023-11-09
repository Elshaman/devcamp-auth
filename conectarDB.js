const mongoose = require('mongoose')

const conectarBD = async() => {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/dev-auth')
    console.log('mongo conectado')
}

module.exports = conectarBD