const { getPost } = require('../repositories/post.repo')
const like = require('../repositories/like.repo')

const createLike = async ({ post_id, user_id }) => {
    const post = (await getPost(post_id)).rows[0]
    if (!post) {
        throw new Error("Post does not exist");

    }

    return (await like.insertLike({ post_id, user_id })).rows[0]
}


const getAllLikes = async ({ post_id }) => {
    const post = (await getPost(post_id)).rows[0]
    if (!post) {
        throw new Error("Post does not exist");

    }
    return (await like.getAllLikes(post_id)).rows[0]
}



module.exports = {
    createLike,
    getAllLikes,
}
