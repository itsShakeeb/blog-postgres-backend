const express = require('express')
const { createLikeController, getAllLikesController } = require('../controllers/like.controller')
const { auth } = require('../middleware/auth')
const { validateAddLike } = require('../validators/like.validator')
const router = express.Router()


router.post('/', [auth, validateAddLike], createLikeController)
router.get('/all/:id', [auth], getAllLikesController)

module.exports = router