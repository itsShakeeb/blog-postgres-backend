const express = require('express');
const { createUserController, loginUserController } = require('../controllers/user.controller');
const { validateUser, validateLogin } = require('../validators/user.validator');

const router = express.Router()

router.post('/', [validateUser], createUserController)
router.post('/login', [validateLogin], loginUserController)


module.exports = router