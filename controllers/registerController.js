const { registerModel } = require('../models/registerModel');

const registerController = {
    async registerUser(req, res) {
        try {
            const data = {
                cedula: req.body.apiCedula,
                nombres: req.body.apiNombre,
                area: req.body.apiAgencia,
                ip_registro: req.ip,
                fecha_nacimiento: req.body.apiFechaNa,
                genero: req.body.apiGenero,
                cuenta: req.body.apiCuenta,
                email: req.body.apiCorreo
            };

            // Verifica si la cédula ya existe
            const exists = await registerModel.checkCedulaExists(data.cedula);
            if (exists) {
                return res.status(400).json({ error: 'La cédula ya está registrada' });
            }

            const result = await registerModel.insertUser(data);

            res.status(201).json({ message: 'Usuario registrado exitosamente', data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al registrar el usuario' });
        }
    }
};

module.exports = registerController;