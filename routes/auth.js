const UserModel = require('../models/usersModel')
const express = require('express')
const router = express.Router()


//ruta de registro de usuarios
router.post('/register' , async(req , res) => {
    
    const { name , email , password, role } = req.body
    try {
        const user = await UserModel.create({
                name, email, password, role
        })


        sendTokenResponse(user, 201, res)


    } catch (error) {
        res.status(400).json({
            success:false,
            error: error.message
        })
    }
   
})




//ruta de registro de usuarios
router.post('/login' , async(req , res) => {
    
    const { email , password } = req.body

    //si en el payload no se trae alguno
    if((!email || !password)){
        res.status(400).json({
            success:false,
            msg: "debe ingresar email y password"
        })

    }else{
        try {
            //buscar usuario
            const user = await UserModel.findOne({email}).select('+password')
            //si no existe usuario
            if(!user){
                res.status(401).json({
                    success:false,
                    msg: "credenciales invalidas"
                })
            }else{
                const isMatch= await user.comparePassword(password)
                //si no coinciden
                if(!isMatch){
                    res.status(401).json({
                        success:false,
                        msg: "credenciales invalidas"
                    })
                }else{
                   sendTokenResponse(user , 200, res)
                }

            }
        } catch (error) {
            res.status(400).json({
                success:false,
                error: error.message
            })
        }
    }
})


const sendTokenResponse = (user,statusCode , res) => {
    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRE_COOKIE *24*60*60*1000),
        httpOnly: true,

    }
    res.
        status(statusCode).
        cookie('token' , token , options).
        json({
            success: true,
            token
        })
}


module.exports = router
