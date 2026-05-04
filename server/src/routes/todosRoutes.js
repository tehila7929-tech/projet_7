const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todosController');

router.get('/', TodoController.getTodos);
router.post('/users/:userId', TodoController.createTodo);
router.put('/users/:userId/:id', TodoController.updateTodo);
router.delete('/users/:userId/:id', TodoController.deleteTodo);

module.exports = router;