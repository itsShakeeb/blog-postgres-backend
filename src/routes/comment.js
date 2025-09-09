const express = require('express')
const { createCommentController, deleteCommentController, editCommentController, getAllCommentsController } = require('../controllers/comment.controller')
const { auth } = require('../middleware/auth')
const { validateAddComment, validateEditComment } = require('../validators/comment.validator')
const router = express.Router()


router.post('/', [auth, validateAddComment], createCommentController)
router.get('/all/:id', [auth], getAllCommentsController)
router.patch('/:id', [auth, validateEditComment], editCommentController)
router.delete('/:id', [auth], deleteCommentController)

module.exports = router