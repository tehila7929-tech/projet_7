// const authMiddleware = require('../middlewares/authMiddleware');

// // החלת המידלוור על כל הנתיבים בקובץ הזה
// // זה אומר שאי אפשר לגשת לאף אחת מהכתובות כאן בלי טוקן תקין
// router.use(authMiddleware);


const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todosController');

// --- הגדרת הנתיבים ---

// שליפת כל המשימות של משתמש
router.get('/users/:userId/todos', TodoController.getTodos);

// יצירת משימה חדשה עבור משתמש
router.post('/users/:userId/todos', TodoController.createTodo);

// עדכון משימה ספציפית (לפי מזהה משתמש ומזהה משימה)
router.put('/users/:userId/todos/:id', TodoController.updateTodo);

// מחיקת משימה ספציפית
router.delete('/users/:userId/todos/:id', TodoController.deleteTodo);

module.exports = router;