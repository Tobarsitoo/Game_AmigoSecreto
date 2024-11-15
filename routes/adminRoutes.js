const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated } = require('../middleware/auth');

// Ruta para obtener usuarios (ya existente)
router.get('/users', isAuthenticated, adminController.getAllUsers);

// Ruta para agregar un usuario
router.post('/users', isAuthenticated, adminController.addUser);

module.exports = router;