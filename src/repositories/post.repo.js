const { query } = require("../config/db.conf")


const insertPost = ({ title, body, is_published, author_id }) => {
    return query(
        `   INSERT INTO posts (title, body, is_published, author_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id, title
        `, [title, body, is_published, author_id])
}

module.exports = {
    insertPost
}