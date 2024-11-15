const UserModel = require('../models/userModel');
const AuditModel = require('../models/auditModel');

exports.login = (req, res) => {
    const { usuario, contraseña } = req.body;
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) === '::1' ? '127.0.0.1' : req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (usuario && contraseña) {
        UserModel.findByCedula(usuario, (err, results) => {
            if (err) {
                AuditModel.registrarAuditoria(null, ip, 'Error en servidor al buscar usuario', 'Intento de login fallido', usuario);
                return res.status(500).json({ success: false, message: 'Error del servidor' });
            }

            if (results.length > 0) {
                const user = results[0];

                UserModel.comparePassword(contraseña, user.contraseña, (err, isMatch) => {
                    if (err) {
                        AuditModel.registrarAuditoria(user.id_usuario, ip, 'Error de comparación de contraseña', 'Intento de login fallido');
                        return res.status(500).json({ success: false, message: 'Error de comparación de contraseña' });
                    }

                    if (isMatch) {
                        req.session.loggedin = true;
                        req.session.nombre = user.nombres;
                        req.session.cedula = user.cedula;
                        req.session.rol = user.rol;
                        req.session.genero = user.genero;
                        req.session.id_usuario = user.id_usuario;

                        let redirectUrl = '/home';
                        if (user.rol === 'administrador') {
                            redirectUrl = '/admin-dashboard';
                        } else if (user.rol === 'usuario') {
                            redirectUrl = '/usuario-dashboard';
                        }

                        AuditModel.registrarAuditoria(user.id_usuario, ip, 'Inicio de sesión exitoso', `Acceso correcto del usuario ${user.nombres}`);
                        res.json({ success: true, message: 'Inicio de sesión exitoso', redirect: redirectUrl });
                    } else {
                        AuditModel.registrarAuditoria(ip, 'Contraseña incorrecta', `Intento de login fallido del usuario ${user.nombres}`);
                        res.json({ success: false, message: 'Contraseña incorrecta' });
                    }
                });
            } else {
                AuditModel.registrarAuditoria(ip, 'Usuario no encontrado', 'Intento de login fallido', usuario);
                res.json({ success: false, message: 'Usuario no encontrado' });
            }
        });
    } else {
        res.json({ success: false, message: 'Por favor ingrese un Usuario y Contraseña' });
    }
};

exports.admindashboard = (req, res) => {
    if (req.session.loggedin && req.session.rol === 'administrador') {
        res.render('admin', {
            nombre: req.session.nombre,
            id_usuario: req.session.id_usuario
        });
    } else {
        res.redirect('/');
    }
};

exports.userdashboard = (req, res) => {
    if (req.session.loggedin && req.session.rol === 'usuario') {
        res.render('user', {
            nombre: req.session.nombre,
            id_usuario: req.session.id_usuario
        });
    } else {
        res.redirect('/');
    }
};