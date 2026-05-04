const Comments = require('../models/commentsModel');

const CommentsService = {
    getPostsComments: async (postId) => {
        if (!postId) throw new Error('post ID is required');
        return await Comments.getByPostId(postId);
    },

    createComment: async (postId, userId, name, email, body) => {
        if (!postId) throw new Error('post ID is required');
        if (!name || name.trim() === '') throw new Error('Name cannot be empty');
        if (!email || email.trim() === '') throw new Error('Email cannot be empty');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        if (!body || body.trim() === '') throw new Error('Body cannot be empty');

        const insertId = await Comments.create(postId, userId, name, email, body);
        return { id: insertId, postId, userId, name, email, body };
    },

    updateComment: async (userId, commentId, updatedData) => {
        if (!commentId) throw new Error('Comment ID is required');
        if (!updatedData.body || updatedData.body.trim() === '') throw new Error('Body cannot be empty');

        const affectedRows = await Comments.update(userId, commentId, updatedData);
        if (affectedRows === 0) {
            throw new Error('Comments not found or not authorized to update');
        }
        return { success: true, message: 'Comments updated successfully' };
    },

    deleteComment: async (userId, commentId) => {
        if (!commentId) throw new Error('Comment ID is required');

        const affectedRows = await Comments.delete(userId, commentId);
        if (affectedRows === 0) {
            throw new Error('Comments not found or not authorized to delete');
        }
        return { success: true, message: 'Comments deleted successfully' };
    }
};

module.exports = CommentsService;