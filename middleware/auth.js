const jwt = require('jsonwebtoken');

const UserModel = require('../models/usersModel')

//middleware para proteger rutas

exports.protect = async(req, res , next) => {

    let token

    //verificar header de authorizacion
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        //asignar el token de Bearer
        token = req.headers.authorization.split(' ')[1]
    }
    // caso 1: el troken no llegó en el headet Auth
    if(!token){
        res.status(401).json(
            {
                success: false,
                msg: "No autorizado para acceder a esta ruta"
            }
        )
    }else{
        try{
            //caso 2: 

            //verificar el token proporcionado utilizando clave secreta
            const decoded = jwt.verify(
                token, 
                process.env.JWT_SECRET_KEY
            )
            console.log(decoded)
                //hallar el usuario cuyp id figura en el token
            req.user = await UserModel.findById(decoded.id) 

            //ir al proximo paso
            next()
        }catch(error){

        }
    }
}

//brindar acceso a roles especificos

exports.authorize = ( ...roles )=>{
    return (req, res , next)=>{
        if(!roles.includes(req.user.role)){
            res.status(403).json(
                {
                    success: false,
                    msg: "Rol No autorizado para acceder a esta ruta"
                }
            )
        }else{
            next()
        }
    }
}






