const { insertPost } = require("../repositories/post.repo");
const { findUserById } = require("../repositories/user.repo");

const createPost = async ({ title, body, author_id, is_published, user }) => {
    const existing = await findUserById(author_id);

    if (existing.rows.length === 0) {
        throw new Error('Action not permitted');
    }

    if (user.sub !== author_id) {
        throw new Error('Action not permitted 2');

    }

    return (await insertPost({ title, body, author_id, is_published: is_published === 'draft' ? false : true })).rows[0];   

}
module.exports = { createPost }