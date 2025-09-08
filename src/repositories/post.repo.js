const { query } = require("../config/db.conf")


const insertPost = ({ title, body, is_published, author_id }) => {
    return query(
        `   INSERT INTO posts (title, body, is_published, author_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id, title, is_published, author_id
        `, [title, body, is_published, author_id])
}

const getPost = (post_id) => {
    return query(
        `
            SELECT 
                posts.id AS post_id,
                posts.title AS title,
                posts.body AS body,
                posts.is_published AS is_published,
                posts.created_at AS created_at,
                users.email AS author_email,
                users.name AS author_name,
                users.id AS author_id
            FROM posts
            INNER JOIN users ON
            posts.author_id = users.id
            WHERE posts.id = $1
            AND is_deleted = false
                
        `,
        [post_id]
    )
}

const updatePost = (post_id, { title, body, is_published }) => {
    return query(
        `
            UPDATE posts
            SET title = $2,
                body = $3,
                is_published = $4
            WHERE id = $1
            AND is_deleted = false
            RETURNING id, title, body, is_published, author_id
        `,
        [post_id, title, body, is_published]
    )
}

const deletePost = (post_id) => {
    return query(
        `
            UPDATE posts
            SET is_deleted = true
            WHERE id = $1
        `,
        [post_id]
    )
}

module.exports = {
    insertPost,
    getPost,
    updatePost,
    deletePost
}