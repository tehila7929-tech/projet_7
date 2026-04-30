const db = require('../config/db');

const Todo = {
    // GET - קבלת כל ה-Todos של משתמש ספציפי (לפי id של המשתמש)
    getByUserId: async (userId) => {
        const [rows] = await db.query(
            'SELECT * FROM todos WHERE user_id = ? ORDER BY id ASC',
            [userId]
        );
        return rows;
    },

    // POST - יצירת Todo חדש
    create: async (userId, title) => {
        const [result] = await db.query(
            'INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?)',
            [userId, title, false] // כברירת מחדל Todo חדש אינו הושלם
        );
        return result.insertId;
    },

    // PUT - עדכון תוכן או סטטוס ביצוע של Todo
    update: async (userId, todoId, updatedData) => {
        const { title, completed } = updatedData;
        const [result] = await db.query(
            'UPDATE todos SET title = ?, completed = ? WHERE id = ? AND user_id = ?',
            [title, completed, todoId, userId]
        );
        return result.affectedRows;
    },

    // DELETE - מחיקת פריט
    delete: async (userId, todoId) => {
        const [result] = await db.query('DELETE FROM todos WHERE id = ? AND user_id = ?',
            [todoId, userId]);
        return result.affectedRows;
    }
};

module.exports = Todo;