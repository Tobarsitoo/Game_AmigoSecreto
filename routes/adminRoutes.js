const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated } = require('../middleware/auth');

// Rutas de usuarios
router.get('/users', isAuthenticated, adminController.getAllUsers); // Ruta para obtener usuarios (ya existente)
router.get('/users/:id', isAuthenticated, adminController.getUserById); // Ruta para obtener un usuario (para edición)
router.post('/users', isAuthenticated, adminController.addUser); // Ruta para agregar un usuario
router.put('/users/:id', adminController.editUser); // Ruta para editar un usuario
router.delete('/users/:id', isAuthenticated, adminController.deleteUser); // Ruta para eliminar un usuario
router.get('/friends-total', isAuthenticated, adminController.getTotalUsersAndFriends); // Ruta para obtener el total de usuarios y amigos secretos asignados

// Ruta de fechas
router.get('/fechas', isAuthenticated, adminController.getDates); // Ruta para obtener las fechas
router.put('/fechas', isAuthenticated, adminController.updateDates); // Ruta para actualizar las fechas

// Rutas de reinicio
router.post('/reset-game', isAuthenticated, adminController.resetGame); // Ruta para reiniciar el jeugo
router.post('/reset-users', isAuthenticated, adminController.resetUsers); // Ruta para reiniciar los usuarios
router.post('/reset-friends', isAuthenticated, adminController.resetFriends); // Ruta para reiniciar los amigos

module.exports = router;