const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/register', (req, res) => {
    res.render('register', { apiUrl: process.env.API_AS400 });
});

module.exports = router;