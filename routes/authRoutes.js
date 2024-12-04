// Importar las dependencias necesarias
const express = require('express');  // Framework web para Node.js
const router = express.Router();  // Crear una nueva instancia del enrutador de Express
const authController = require('../controllers/authController');  // Controlador para la gestión de autenticación
const AuditModel = require('../models/auditModel');  // Modelo de auditoría para registrar eventos
const { isAuthenticated } = require('../middleware/auth');  // Middleware para verificar si el usuario está autenticado
const path = require('path');  // Módulo para trabajar con rutas de archivos

// Ruta para la página de login (se sirve un archivo HTML estático)
router.get('/', (req, res) => {
    // Enviar el archivo de login como respuesta
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

// Ruta para procesar el login (POST), delegando la lógica de autenticación al controlador
router.post('/login', authController.login);

// Ruta para el panel de administración (solo accesible para usuarios autenticados)
router.get('/admin-dashboard', isAuthenticated, authController.admindashboard);

// Ruta para el panel de usuario (solo accesible para usuarios autenticados)
router.get('/usuario-dashboard', isAuthenticated, authController.userdashboard);

// Ruta para cerrar sesión (se destruye la sesión y se registra la auditoría)
router.get('/logout', (req, res) => {
    // Obtener la dirección IP del usuario (considerando proxies)
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) === '::1' ? '127.0.0.1' : req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Verificar si el usuario está autenticado antes de registrar la auditoría de cierre de sesión
    if (req.session.loggedin) {
        // Registrar el evento de cierre de sesión en la auditoría
        AuditModel.registrarAuditoria(
            req.session.id_usuario,  // ID del usuario
            ip,                       // Dirección IP del usuario
            'Cierre de sesión',       // Acción realizada
            `Cierre correcto del usuario ${req.session.nombre}` // Detalles de la acción
        );
    }

    // Destruir la sesión y enviar respuesta
    req.session.destroy((err) => {
        if (err) {
            // Manejo de errores en caso de fallo al destruir la sesión
            console.error('Error al destruir la sesión:', err);
            return res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
        }
        // Respuesta exitosa al cliente
        res.json({ success: true });
    });
});

// Exportar las rutas para que puedan ser utilizadas en la aplicación principal
module.exports = router;