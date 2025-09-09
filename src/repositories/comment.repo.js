const { query } = require('../config/db.conf')

const insertComment = async ({ content, post_id, author_id: user_id }) => {
    return query(
        `
            INSERT INTO comments (content, post_id, user_id)
            VALUES ($1, $2, $3)
            RETURNING content, post_id
        `,
        [content, post_id, user_id]
    )
}
const getAllComments = async (post_id) => {
    return query(
        `
            SELECT * FROM comments
            WHERE post_id = $1
            AND is_deleted = false
        `,
        [post_id]
    )
}
const removeComment = async (comment_id) => {
    return query(
        `
            UPDATE comments 
            SET is_deleted = true
            WHERE id = $1
        `,
        [comment_id]
    )
}
const updateComment = async (content, comment_id) => {
    return query(
        `
            UPDATE comments
            SET content = $1r
            WHERE id = $2
            RETURNING id, content
        `,
        [content, comment_id]
    )
}

const getCommentById = async (comment_id) => {
    return query(
        `
            SELECT * FROM comments
            WHERE id = $1
            AND is_deleted = false
        `,
        [comment_id]
    )
}

module.exports = {
    insertComment,
    removeComment,
    updateComment,
    getAllComments,
    getCommentById
}