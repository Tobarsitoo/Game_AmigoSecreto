const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const AuditModel = require('../models/auditModel');
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.post('/login', authController.login);
router.get('/admin-dashboard', authController.admindashboard);
router.get('/usuario-dashboard', authController.userdashboard);
router.get('/logout', (req, res) => {
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) === '::1' ? '127.0.0.1' : req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (req.session.loggedin) {
        AuditModel.registrarAuditoria(
            req.session.id_usuario,
            ip,
            'Cierre de sesión',
            `Cierre correcto del usuario ${req.session.nombre} ${req.session.primer_apellido} ${req.session.segundo_apellido}`
        );
    }
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al destruir la sesión:', err);
            return res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
        }
        res.json({ success: true });
    });
});

module.exports = router;