const express = require('express')
const router = express.Router()
const ClientController = require('../controllers/client.controller')

router.post('/register', ClientController.register)
router.post('/login', ClientController.logIn)
router.post('/refresh-token', ClientController.refreshToken)

module.exports = router