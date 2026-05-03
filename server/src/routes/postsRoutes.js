const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postsController');

// --- שליפה ---
// כל הפוסטים
router.get('/posts', PostController.getAllPosts);

// פוסטים של משתמש מסוים
router.get('/users/:userId/posts', PostController.getUserPosts);

// --- פעולות על פוסט ספציפי ---
// יצירה
router.post('/users/:userId/posts', PostController.createPost);

// עדכון (לפי מזהה משתמש ומזהה פוסט)
router.put('/users/:userId/posts/:id', PostController.updatePost);

// מחיקה (לפי מזהה משתמש ומזהה פוסט)
router.delete('/users/:userId/posts/:id', PostController.deletePost);

module.exports = router;