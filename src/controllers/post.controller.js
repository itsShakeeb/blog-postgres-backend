
const postService = require('../services/post.service')

const createPostController = async (req, res) => {
    const { title, author_id, body, is_published } = req.body
    const {user} = req
    try {
        const response = await postService.createPost({ title, author_id, body, is_published, user})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createPostController
}