const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentsController');
const { checkCommentOwnership } = require('../middlewares/ownershipMiddleware');

// --- הגדרת הראוטים ---

// שליפת כל התגובות של פוסט מסוים
router.get('/', CommentController.getComments);
router.post('/', CommentController.createComment);
router.patch('/:id', CommentController.updateComment);
router.delete('/:id', CommentController.deleteComment);

module.exports = router;