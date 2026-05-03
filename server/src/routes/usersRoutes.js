const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');

// כאשר מגיעה בקשת POST לכתובת /login, הפעל את הפונקציה login מהקונטרולר
router.post('/login', UserController.login);

// נתיב לקבלת מידע מלא על משתמש
router.get('/info/:userId', UserController.getUserInfo);

// נתיב רק לבדיקה אם המשתמש קיים
router.get('/exists/:userId', UserController.checkUserExists);

module.exports = router;