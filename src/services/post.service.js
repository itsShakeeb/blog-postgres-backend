const { insertPost, getPost, deletePost, updatePost } = require("../repositories/post.repo");
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

const getPostById = async (post_id) => (await getPost(post_id)).rows[0]

const updatePostById = async (post_id, user_id, { title, body, is_published }) => {
    const post = await getPostById(post_id)
    if (!post) {
        throw new Error('Post not found')
    }
    if (post.author_id !== user_id) {
        throw new Error('Action not permitted')
    }
    const updatedPost = {
        title: title || post.title,
        body: body || post.body,
        is_published: typeof is_published === 'boolean' ? is_published : post.is_published
    }

    return (await updatePost(post_id, updatedPost)).rows[0]
}

const deletePostById = async (post_id, user_id) => {
    const post = await getPostById(post_id)
    if (!post) {
        throw new Error('Post not found')
    }
    if (post.author_id !== user_id) {
        throw new Error('Action not permitted')
    }
    return await deletePost(post_id)
}

module.exports = { createPost, getPostById, updatePostById, deletePostById }