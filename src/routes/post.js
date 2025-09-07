const express = require('express')
const { validatePost } = require('../validators/post.validator')
const { createPostController } = require('../controllers/post.controller')
const { auth } = require('../middleware/auth')



const router = express.Router()

router.post('/', [validatePost, auth], createPostController)

module.exports = router