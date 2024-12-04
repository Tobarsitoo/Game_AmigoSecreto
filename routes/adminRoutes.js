// Importar las dependencias necesarias
const express = require('express');  // Framework web para Node.js
const router = express.Router();  // Crear una nueva instancia del enrutador de Express
const adminController = require('../controllers/adminController');  // Controlador que maneja las operaciones administrativas
const { isAuthenticated } = require('../middleware/auth');  // Middleware para verificar si el usuario está autenticado

// Rutas de usuarios: Gestión de usuarios en la aplicación ======================================>

// Obtener todos los usuarios (solo accesible para usuarios autenticados)
router.get('/users', isAuthenticated, adminController.getAllUsers); 

// Obtener un usuario por su ID (para edición, solo accesible para usuarios autenticados)
router.get('/users/:id', isAuthenticated, adminController.getUserById); 

// Crear un nuevo usuario (solo accesible para usuarios autenticados)
router.post('/users', isAuthenticated, adminController.addUser); 

// Editar un usuario existente (requiere autenticación para modificar)
router.put('/users/:id', adminController.editUser); 

// Eliminar un usuario por su ID (solo accesible para usuarios autenticados)
router.delete('/users/:id', isAuthenticated, adminController.deleteUser); 

// Obtener el total de usuarios y amigos asignados (solo accesible para usuarios autenticados)
router.get('/friends-total', isAuthenticated, adminController.getTotalUsersAndFriends); 


// Rutas de fechas: Gestión de fechas del juego ======================================>

// Obtener las fechas del sistema (solo accesible para usuarios autenticados)
router.get('/fechas', isAuthenticated, adminController.getDates); 

// Actualizar las fechas (solo accesible para usuarios autenticados)
router.put('/fechas', isAuthenticated, adminController.updateDates); 

// Rutas de reinicio: Reiniciar componentes del juego

// Reiniciar el juego (solo accesible para usuarios autenticados)
router.post('/reset-game', isAuthenticated, adminController.resetGame); 

// Reiniciar los usuarios (solo accesible para usuarios autenticados)
router.post('/reset-users', isAuthenticated, adminController.resetUsers); 

// Reiniciar la asignación de amigos secretos (solo accesible para usuarios autenticados)
router.post('/reset-friends', isAuthenticated, adminController.resetFriends); 

// Exportar las rutas para que puedan ser utilizadas en la aplicación principal
module.exports = router;