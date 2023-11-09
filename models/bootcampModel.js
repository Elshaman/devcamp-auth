const mongoose = require('mongoose')

const BootcampSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "nombre requerido"]
    },
    phone:{
        type: Number,
        required: [true, "phone requerido"],
        maxlength: [10 , "telefono exedido"]
    }
})

module.exports = mongoose.model("Bootcamp" , BootcampSchema )