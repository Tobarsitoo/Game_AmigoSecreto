const express = require('express');
const router = express.Router();
const rouletteController = require('../controllers/rouletteController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, (req, res) => {
    res.render('roulette'); 
});

router.post('/assign', isAuthenticated, rouletteController.assignAmigoSecreto);
router.get('/amigo-preferencias', isAuthenticated, rouletteController.getAmigoPreferences);

module.exports = router;