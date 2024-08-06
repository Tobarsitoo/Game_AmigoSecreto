const UserModel = require('../models/userModel');
const path = require('path');

exports.login = (req, res) => {
    const { usuario, contraseña } = req.body;

    if (usuario && contraseña) {
        UserModel.findByUsername(usuario, (err, results) => {
            if (err) return res.status(500).json({ success: false, message: 'Error del servidor' });

            if (results.length > 0) {
                const user = results[0];

                UserModel.comparePassword(contraseña, user.contraseña, (err, isMatch) => {
                    if (err) return res.status(500).json({ success: false, message: 'Error de comparación de contraseña' });

                    if (isMatch) {
                        req.session.loggedin = true;
                        req.session.nombre = user.nombre;
                        req.session.usuario = user.usuario;
                        req.session.rol = user.rol;
                        req.session.id_usuario = user.id_usuario;

                        let redirectUrl = '/home';
                        if (user.rol === 'administrador') {
                            redirectUrl = '/admin-dashboard';
                        } else if (user.rol === 'usuario') {
                            redirectUrl = '/usuario-dashboard';
                        }

                        res.json({ success: true, message: 'Inicio de sesión exitoso', redirect: redirectUrl });
                    } else {
                        res.json({ success: false, message: 'Contraseña incorrecta' });
                    }
                });
            } else {
                res.json({ success: false, message: 'Usuario no encontrado' });
            }
        });
    } else {
        res.json({ success: false, message: 'Por favor ingrese un Usuario y Contraseña' });
    }
};

exports.admindashboard = (req, res) => {
    if (req.session.loggedin) {
        res.send(`Bienvenido, administrador: ${req.session.nombre}!`);
    } else {
        res.send('Por favor inicie sesión para ver esta página.');
    }
};

exports.userdashboard = (req, res) => {
    if (req.session.loggedin) {
        res.render('user', { nombre: req.session.nombre });
    } else {
        res.send('Por favor inicie sesión para ver esta página.');
    }
};