
const postService = require('../services/post.service')

const createPostController = async (req, res) => {
    const { title, author_id, body, is_published } = req.body
    const { user } = req
    try {
        const response = await postService.createPost({ title, author_id, body, is_published, user })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getPostController = async (req, res) => {
    const { id: post_id } = req.params
    try {
        const post = await postService.getPostById(post_id)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
const updatePostController = async (req, res) => {
    const { id: post_id } = req.params
    const { title, body, is_published } = req.body
    const { sub: user_id } = req.user
    try {
        const post = await postService.updatePostById(post_id, user_id, { title, body, is_published })
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const deletePostController = async (req, res) => {
    const { id: post_id } = req.params
    const { sub: user_id } = req.user
    try {
        await postService.deletePostById(post_id, user_id)
        res.status(200).json({ msg: 'Post deleted Successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
module.exports = {
    createPostController,
    getPostController,
    updatePostController,
    deletePostController,
}