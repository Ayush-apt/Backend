const express = require('express')
const authcontroller = require('../controllers/auth.controller')

const router = express.Router();

router.post('/register', authcontroller.registerUser)

router.get('/test', (req, res) => {
    console.log("cookies :", req.cookies)
})

module.exports = router;