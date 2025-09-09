
const likeService = require('../services/like.service')

const createLikeController = async (req, res) => {
    const { post_id } = req.body
    const { sub: user_id } = req.user
    try {
        const result = await likeService.createLike({ post_id, user_id })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const getAllLikesController = async (req, res) => {
    const { id: post_id } = req.params
    try {
        const result = await likeService.getAllLikes({ post_id })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



module.exports = {
    createLikeController,
    getAllLikesController
}