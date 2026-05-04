const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todosController');

router.get('/users/:userId/todos', TodoController.getTodos);
router.post('/users/:userId/todos', TodoController.createTodo);
router.put('/users/:userId/todos/:id', TodoController.updateTodo);
router.delete('/users/:userId/todos/:id', TodoController.deleteTodo);

module.exports = router;