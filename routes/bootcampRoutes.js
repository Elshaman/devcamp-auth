const express = require('express')
const router = express.Router()
const bootcampModel = require('../models/bootcampModel')
const {protect , authorize} = require('../middleware/auth')


router.post( '/' , protect ,  authorize('publisher' , 'admin'), async (req, res) => {
    try {
        const bootcamp = await bootcampModel.create(req.body)
        res.status(201).
            json({
                success: true, 
                data: bootcamp
            })
    } catch (error) {
        res.status(400).
        json({
            success: false, 
            msg : error.message
        })
    }
}
)

module.exports = router
