const TodoService = require('../services/todosService');

const TodoController = {
    // GET /api/todos/:userId
    // שליפת כל המשימות עבור משתמש ספציפי לפי ה-ID שנשלח בכתובת
    getTodos: async (req, res) => {
        try {
            const userId = req.query.userId;
            const todos = await TodoService.getUserTodos(userId);
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // POST /api/todos/:userId
    // יצירת משימה חדשה המשויכת למזהה המשתמש שבכתובת
    createTodo: async (req, res) => {
        try {
            const { userId, title } = req.body;
            
            const newTodo = await TodoService.createTodo(userId, title);
            res.status(201).json(newTodo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // PUT /api/todos/:userId/:id
    // עדכון משימה ספציפית עבור משתמש מסוים
    updateTodo: async (req, res) => {
        try {
            const todoId = req.params.id;
            const { userId, title, completed } = req.body;
            
            const result = await TodoService.updateTodo(userId, todoId, { title, completed });
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // DELETE /api/todos/:userId/:id
    // מחיקת משימה של משתמש לפי מזהה המשתמש ומזהה המשימה
    deleteTodo: async (req, res) => {
        try {
            const todoId = req.params.id;
            const { userId } = req.body;
            
            const result = await TodoService.deleteTodo(userId, todoId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = TodoController;