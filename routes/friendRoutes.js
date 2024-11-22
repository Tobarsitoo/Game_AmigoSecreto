const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/friends', isAuthenticated, friendController.getAllFriends);

module.exports = router;