const comment = require('../repositories/comment.repo')

const createComment = async ({ content, post_id, author_id }) => {
    return (await comment.insertComment({ content, post_id, author_id })).rows[0]
}
const editComment = async ({ content, comment_id, author_id }) => {
    const existingComment = (await comment.getCommentById(comment_id))?.rows[0]
    if (!existingComment) throw new Error('comment does not exist')
    if (existingComment.user_id !== author_id) {
        throw new Error('Action not permitted')
    }
    return (await comment.updateComment(content, comment_id)).rows[0]
}

const getAllComments = async (post_id) => {
    return (await comment.getAllComments(post_id)).rows[0]
}

const deleteComment = async ({ comment_id, author_id }) => {
    const existingComment = (await comment.getCommentById(comment_id))?.rows[0]
    if (!existingComment) throw new Error('comment does not exist')
    if (existingComment.user_id !== author_id) {
        throw new Error('Action not permitted')
    }
    return (await comment.removeComment(comment_id))
}


module.exports = {
    createComment,
    getAllComments,
    editComment,
    deleteComment
}
