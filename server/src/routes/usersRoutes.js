const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');

router.post('/login', UserController.login);
router.post('/', UserController.register);
router.get('/', UserController.checkUsernameExists);
router.get('/info/:userId', UserController.getUserInfo);
router.get('/exists/:userId', UserController.checkUserExists);

module.exports = router;