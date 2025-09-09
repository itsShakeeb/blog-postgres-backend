const { query } = require('../config/db.conf')

const insertLike = async ({ post_id, user_id }) => {
    return query(
        `
            WITH existing AS (
                DELETE FROM likes
                WHERE post_id = $1 AND user_id = $2
                RETURNING *
            ),
            ins AS (
                INSERT INTO likes (post_id, user_id)
                SELECT $1, $2
                WHERE NOT EXISTS (SELECT 1 FROM existing)
                RETURNING *
            )
            SELECT $1 AS post_id, $2 AS user_id,
            COUNT(likes.*)::int AS like_count,
            EXISTS (
                SELECT 1 FROM likes WHERE post_id = $1 AND user_id = $2
            ) AS is_liked
            FROM likes
            WHERE post_id = $1


        `,
        [post_id, user_id]
    )
}

const getAllLikes = (post_id) => {
    return query(
        `
            SELECT COUNT(*)::int AS likes_count FROM likes
            WHERE post_id = $1
        `,
        [post_id]
    )
}




module.exports = {
    insertLike,
    getAllLikes
}