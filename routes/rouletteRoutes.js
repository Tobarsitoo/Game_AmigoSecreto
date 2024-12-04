// Importar las dependencias necesarias
const express = require('express');  // Framework web para Node.js
const router = express.Router();  // Crear una nueva instancia del enrutador de Express
const rouletteController = require('../controllers/rouletteController');  // Controlador para manejar la lógica de la ruleta
const { isAuthenticated } = require('../middleware/auth');  // Middleware para verificar que el usuario esté autenticado

// Rutas para el usuario (requieren autenticación)
router.get('/', isAuthenticated, (req, res) => {
    // Renderiza la vista 'roulette' para el usuario autenticado
    res.render('roulette');  
});

router.post('/assign', isAuthenticated, rouletteController.assignAmigoSecreto); 
// Asigna un amigo secreto cuando el usuario hace clic en el botón de asignación de la ruleta
// Llama al método 'assignAmigoSecreto' del controlador 'rouletteController'

router.get('/amigo-preferencias', isAuthenticated, rouletteController.getAmigoPreferences);  
// Devuelve las preferencias del amigo secreto asignado
// Llama al método 'getAmigoPreferences' del controlador para obtener los detalles de las preferencias

// Rutas para el administrador (requieren autenticación)
router.get('/rouletteAdmin', isAuthenticated, (req, res) => {
    // Renderiza la vista 'rouletteAdmin' para el administrador autenticado
    res.render('rouletteAdmin');  
});

// Ruta para validar fechas y asignar amigos secretos
router.post('/validate-dates', rouletteController.validateAndAssignAmigoSecreto);  
// Valida las fechas y asigna amigos secretos de acuerdo con la lógica de negocio del juego
// Llama al método 'validateAndAssignAmigoSecreto' del controlador para realizar esta acción

// Exportar el enrutador para que pueda ser utilizado en la aplicación principal
module.exports = router;