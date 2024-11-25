const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated } = require('../middleware/auth');

// Ruta para obtener usuarios (ya existente)
router.get('/users', isAuthenticated, adminController.getAllUsers);

// Ruta para obtener un usuario (para edición)
router.get('/users/:id', isAuthenticated, adminController.getUserById);

// Ruta para agregar un usuario
router.post('/users', isAuthenticated, adminController.addUser);

// Ruta para editar un usuario
router.put('/users/:id', adminController.editUser);

// Ruta para eliminar un usuario
router.delete('/users/:id', isAuthenticated, adminController.deleteUser);

module.exports = router;