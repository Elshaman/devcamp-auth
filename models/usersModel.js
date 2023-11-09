const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [ true , 'Please add a name']
    }, 
    email:{
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'invalid email'
        ],
        required: [true, 'please add a email'],
        unique: [true]
    }, 
    role: {
        type:String,
        enum: [ 'user' , 'publisher' ],
        default: 'user',       
    }, 
    password: {
        type: String,
        required: [true, 'please add a password'],
        minlength: 6 , 
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date, 
    createdAt: {
        type: Date,
        default: Date.now
    }
})


UserSchema.pre("save" , async function(next){
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
})

UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({
        id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn: process.env.JWT_EXPIRE_SECRET_KEY
    })
}

UserSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password, this.password)
}



module.exports = mongoose.model('User' , UserSchema)

