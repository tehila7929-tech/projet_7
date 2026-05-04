const db = require('../config/db');

const post = {

    getByUserId: async (userId) => {
        const [rows] = await db.query(
            'SELECT id, user_id AS userId, title, body FROM posts WHERE user_id = ? ORDER BY id ASC',
            [userId]
        );
        return rows;
    },

    getAll: async () => {
        const [rows] = await db.query(
            'SELECT id, user_id AS userId, title, body FROM posts ORDER BY id ASC'
        );
        return rows;
    },

    create: async (userId, title, body) => {
        const [result] = await db.query(
            'INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)',
            [userId, title, body]
        );
        return result.insertId;
    },

    update: async (userId, postId, updatedData) => {
        const { title, body } = updatedData;
        const [result] = await db.query(
            'UPDATE posts SET title = ?, body = ? WHERE id = ?',
            [title, body, postId]
        );
        return result.affectedRows;
    },

    delete: async (userId, postId) => {
        await db.query('DELETE FROM comments WHERE post_id = ?', [postId]);
        const [result] = await db.query('DELETE FROM posts WHERE id = ?', [postId]);
        return result.affectedRows;
    }
};

module.exports = post;
