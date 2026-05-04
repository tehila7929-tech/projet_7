const Post = require('../models/postsModel');

const PostService = {
    getUserPosts: async (userId) => {
        if (!userId) throw new Error('User ID is required');
        return await Post.getByUserId(userId);
    },

    getAllPosts: async () => {
        return await Post.getAll();
    },

    createPost: async (userId, title, body) => {
        if (!userId) throw new Error('User ID is required');
        if (!title || title.trim() === '') throw new Error('Title cannot be empty');
        if (!body || body.trim() === '') throw new Error('Body cannot be empty');
        const insertId = await Post.create(userId, title, body);
        return { id: insertId, userId, title, body };
    },

    updatePost: async (userId, postId, updatedData) => {
        if (!postId) throw new Error('Post ID is required');
        if (!updatedData.title || updatedData.title.trim() === '') throw new Error('Title cannot be empty');
        if (!updatedData.body || updatedData.body.trim() === '') throw new Error('Body cannot be empty');

        const affectedRows = await Post.update(userId, postId, updatedData);
        if (affectedRows === 0) throw new Error('Post not found');
        return { success: true, message: 'Post updated successfully' };
    },

    deletePost: async (userId, postId) => {
        if (!postId) throw new Error('Post ID is required');

        const affectedRows = await Post.delete(userId, postId);
        if (affectedRows === 0) throw new Error('Post not found');
        return { success: true, message: 'Post deleted successfully' };
    }
};

module.exports = PostService;
