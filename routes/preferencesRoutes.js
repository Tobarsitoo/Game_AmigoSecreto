// Importar las dependencias necesarias
const express = require('express');  // Framework web para Node.js
const router = express.Router();  // Crear una nueva instancia del enrutador de Express
const preferencesController = require('../controllers/preferencesController');  // Controlador para manejar las preferencias de los usuarios (dulces y regalos)
const { isAuthenticated } = require('../middleware/auth');  // Middleware para verificar si el usuario está autenticado

// Ruta para agregar un dulce a las preferencias del usuario
router.post('/dulces', isAuthenticated, preferencesController.addDulce); 
// Solo los usuarios autenticados pueden agregar un dulce a sus preferencias

// Ruta para agregar un regalo a las preferencias del usuario
router.post('/regalos', isAuthenticated, preferencesController.addRegalo); 
// Solo los usuarios autenticados pueden agregar un regalo a sus preferencias

// Ruta para obtener los dulces preferidos del usuario autenticado
router.get('/dulces', isAuthenticated, preferencesController.getDulcesByUser);
// Solo los usuarios autenticados pueden ver sus dulces preferidos

// Ruta para obtener los regalos preferidos del usuario autenticado
router.get('/regalos', isAuthenticated, preferencesController.getRegalosByUser);
// Solo los usuarios autenticados pueden ver sus regalos preferidos

// Ruta para eliminar un dulce de las preferencias del usuario por su ID
router.delete('/dulces/:id', isAuthenticated, preferencesController.deleteDulce); 
// Solo los usuarios autenticados pueden eliminar un dulce de sus preferencias usando el ID del dulce

// Ruta para eliminar un regalo de las preferencias del usuario por su ID
router.delete('/regalos/:id', isAuthenticated, preferencesController.deleteRegalo);
// Solo los usuarios autenticados pueden eliminar un regalo de sus preferencias usando el ID del regalo

// Exportar las rutas para que puedan ser utilizadas en la aplicación principal
module.exports = router;