const UserModel = require('../models/userModel');

const adminController = {
    // Obtener todos los usuarios (ya implementado)
    getAllUsers: (req, res) => {
        UserModel.getAllUsers((err, users) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los usuarios' });
            }
            res.json(users);
        });
    },

    // Agregar un nuevo usuario
    addUser: (req, res) => {
        const { cedula, nombres, area, fecha_nacimiento, genero, email, rol } = req.body;
        const userData = {
            cedula,
            nombres,
            area,
            contraseña: cedula,
            estado: 1,
            emparejado: 0,
            fecha_nacimiento,
            genero,
            email,
            rol,
        };

        UserModel.addUser(userData, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al agregar el usuario' });
            }
            res.status(201).json({ message: 'Usuario agregado correctamente', userId: result.insertId });
        });
    },
};

module.exports = adminController;