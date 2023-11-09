const express = require('express')
const conectarBD = require('./conectarDB')
const bootcampRoutes = require('./routes/bootcampRoutes')
const authRoutes = require('./routes/auth')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()

conectarBD()


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/bootcamps' , bootcampRoutes)
app.use('/api/auth' , authRoutes)

app.listen(  9000 , ()=>{
    console.log('servidor listo')
})
