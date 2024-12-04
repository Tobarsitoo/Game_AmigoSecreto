// Importar las dependencias necesarias
const express = require('express');  // Framework web para Node.js
const router = express.Router();  // Crear una nueva instancia del enrutador de Express
const registerController = require('../controllers/registerController');  // Controlador para manejar el registro de usuarios

// Ruta GET para mostrar el formulario de registro
// Renderiza la vista 'register' y pasa la URL de la API de AS400 desde el archivo .env como una variable
router.get('/register', (req, res) => {
    res.render('register', { apiUrl: process.env.API_AS400 });
});
// Esto asegura que la URL de la API de AS400 esté disponible en la vista de registro para cualquier interacción que se pueda necesitar con la API

// Ruta POST para manejar la lógica del registro de usuario
// Llama al método 'registerUser' del controlador para registrar un nuevo usuario
router.post('/register', registerController.registerUser);  
// El controlador 'registerUser' se encarga de la validación, creación y almacenamiento del usuario en la base de datos

// Exportar el enrutador para que pueda ser utilizado en la aplicación principal
module.exports = router;