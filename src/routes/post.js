const express = require('express')
const { validatePost } = require('../validators/post.validator')
const { createPostController, getPostController, deletePostController, updatePostController } = require('../controllers/post.controller')
const { auth } = require('../middleware/auth')



const router = express.Router()

router.post('/', [validatePost, auth], createPostController)
router.get('/:id', [auth], getPostController)
router.patch('/:id', [auth], updatePostController)
router.delete('/:id', [auth], deletePostController)

module.exports = router