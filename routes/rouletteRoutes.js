const express = require('express');
const router = express.Router();
const rouletteController = require('../controllers/rouletteController');
const { isAuthenticated } = require('../middleware/auth');

// Rutas para el usuario
router.get('/', isAuthenticated, (req, res) => {
    res.render('roulette'); 
});
router.post('/assign', isAuthenticated, rouletteController.assignAmigoSecreto);
router.get('/amigo-preferencias', isAuthenticated, rouletteController.getAmigoPreferences);

//Rutas para el administrador
router.get('/rouletteAdmin',isAuthenticated, (req, res) =>{
    res.render('rouletteAdmin'); 
});

// Ruta para validar fechas y asignar amigo secreto
router.post('/validate-dates', rouletteController.validateAndAssignAmigoSecreto);

module.exports = router;