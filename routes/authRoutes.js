const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.post('/login', authController.login);
router.get('/admin-dashboard', authController.admindashboard);
router.get('/usuario-dashboard', authController.userdashboard);
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al destruir la sesión:', err);
            return res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
        }
        res.json({ success: true });
    });
});

module.exports = router;