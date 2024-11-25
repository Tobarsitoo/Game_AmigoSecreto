const UserModel = require('../models/userModel');

const adminController = {
    // Obtener todos los usuarios
    getAllUsers: (req, res) => {
        UserModel.getAllUsers((err, users) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los usuarios' });
            }
            res.json(users);
        });
    },

    // Obtener todos un usuario
    getUserById: (req, res) => {
        UserModel.findById(req.params.id, (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener usuario' });
            }
            res.json(user);
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

    editUser: (req, res) => {
        const userId = req.params.id;  
        const userData = req.body;

        UserModel.editUser(userId, userData, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al editar el usuario' });
            }
            res.json({ message: 'Usuario actualizado correctamente' });
        });
    },

    deleteUser: (req, res) => {
        const userId = req.params.id;

        UserModel.deleteUser(userId, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar el usuario' });
            }
            res.json({ message: 'Usuario eliminado correctamente' });
        });
    }
};

module.exports = adminController;