const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.get('/register', (req, res) => {
    res.render('register', { apiUrl: process.env.API_AS400 });
});

router.post('/register', registerController.registerUser);

module.exports = router;