const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todosController');

router.get('/', TodoController.getTodos);
router.post('/', TodoController.createTodo);
router.patch('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;