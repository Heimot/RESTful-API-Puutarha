const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth')

router.post('/signup', checkAuth, UserController.user_signup);

router.post('/login', UserController.user_login);

router.delete('/delete/id/:userId', checkAuth, UserController.user_delete_user);

module.exports = router;