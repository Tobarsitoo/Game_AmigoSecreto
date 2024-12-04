// Importar las dependencias necesarias
const express = require('express');  // Framework web para Node.js
const router = express.Router();  // Crear una nueva instancia del enrutador de Express
const friendController = require('../controllers/friendController');  // Controlador para gestionar las funcionalidades relacionadas con los amigos secretos
const { isAuthenticated } = require('../middleware/auth');  // Middleware para verificar si el usuario está autenticado

// Ruta para obtener todos los amigos secretos
router.get('/friends', isAuthenticated, friendController.getAllFriends); 
// La ruta '/friends' es accesible solo si el usuario está autenticado (gracias al middleware isAuthenticated)
// Si el usuario está autenticado, se ejecuta el controlador friendController.getAllFriends para obtener la lista de amigos secretos

// Exportar las rutas para que puedan ser utilizadas en la aplicación principal
module.exports = router;