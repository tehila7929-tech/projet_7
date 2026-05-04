const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postsController');
const { checkPostOwnership } = require('../middlewares/ownershipMiddleware');
// --- שליפה ---
// כל הפוסטים
router.get('/', PostController.getAllPosts);

// פוסטים של משתמש מסוים
router.get('/users/:userId', PostController.getUserPosts);

// --- פעולות על פוסט ספציפי ---
// יצירה
router.post('/users/:userId', PostController.createPost);

// עדכון (לפי מזהה משתמש ומזהה פוסט)
router.put('/users/:userId/:id', PostController.updatePost);

// מחיקה (לפי מזהה משתמש ומזהה פוסט)
router.delete('/users/:userId/posts/:id', checkPostOwnership, PostController.deletePost);

module.exports = router;