const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/users', isAuthenticated, adminController.getAllUsers);


module.exports = router;