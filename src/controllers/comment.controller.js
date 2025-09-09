
const commentService = require('../services/comment.service')

const createCommentController = async (req, res) => {
    const { content, post_id } = req.body
    const { sub: author_id } = req.user

    try {
        const result = await commentService.createComment({ content, post_id, author_id })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const editCommentController = async (req, res) => {
    const { content } = req.body
    const { id: comment_id } = req.params
    const { sub: author_id } = req.user

    try {
        const result = await commentService.editComment({ content, comment_id, author_id })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllCommentsController = async (req, res) => {
    const { id: post_id } = req.params
    try {
        const result = await commentService.getAllComments(post_id)        
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const deleteCommentController = async (req, res) => {
    const { id: comment_id } = req.params
    const { sub: author_id } = req.user
    try {
        await commentService.deleteComment({ comment_id, author_id })
        res.status(200).json({ msg: 'Comment deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    createCommentController,
    getAllCommentsController,
    editCommentController,
    deleteCommentController
}