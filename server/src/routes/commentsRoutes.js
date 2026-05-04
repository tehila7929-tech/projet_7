const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentsController');
const { checkCommentOwnership } = require('../middlewares/ownershipMiddleware');

// --- הגדרת הראוטים ---

// שליפת כל התגובות של פוסט מסוים
router.get('/', CommentController.getComments);

// יצירת תגובה חדשה לפוסט על ידי משתמש מסוים
router.post('/:postId/users/:userId', CommentController.createComment);

// עדכון תגובה ספציפית (צריך לדעת מי המשתמש ומה מזהה התגובה)
router.put('/users/:userId/comments/:id', checkCommentOwnership, CommentController.updateComment);

// מחיקת תגובה ספציפית
router.delete('/users/:userId/comments/:id', checkCommentOwnership, CommentController.deleteComment);

module.exports = router;