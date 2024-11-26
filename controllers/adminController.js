const UserModel = require('../models/userModel');
const DateModel = require('../models/dateModel');
const AdminModel = require('../models/adminModel');

const adminController = {
    // Obtener todas las fechas
    getDates: (req, res) => {
        DateModel.getDates((err, dates) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener las fechas' });
            }
            res.json(dates);
        });
    },

    // Actualizar las fechas
    updateDates: (req, res) => {
        const { fecha_juego, fecha_asignacion } = req.body;

        // Validar las fechas
        if (!fecha_juego || !fecha_asignacion) {
            return res.status(400).json({ error: 'Ambas fechas son requeridas' });
        }

        if (new Date(fecha_juego) > new Date(fecha_asignacion)) {
            return res.status(400).json({ error: 'La fecha de inicio no puede ser posterior a la fecha de asignación automática' });
        }

        DateModel.updateDates(fecha_juego, fecha_asignacion, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al actualizar las fechas' });
            }
            res.json({ message: 'Fechas actualizadas correctamente' });
        });
    },

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
    },

    // Reiniciar el juego
    resetGame: (req, res) => {
        AdminModel.resetGame((err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al reiniciar el juego' });
            }
            res.json({ message: 'El juego ha sido reiniciado correctamente' });
        });
    },

    // Reiniciar solo los usuarios
    resetUsers: (req, res) => {
        AdminModel.resetUsers((err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al reiniciar los usuarios' });
            }
            res.json({ message: 'Los usuarios han sido reiniciados correctamente' });
        });
    },

    // Reiniciar solo los amigos secretos
    resetFriends: (req, res) => {
        AdminModel.resetFriends((err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al reiniciar los amigos secretos' });
            }
            res.json({ message: 'Las asignaciones de amigos secretos han sido reiniciadas correctamente' });
        });
    },

    // Obtener el total de usuarios y amigos secretos asignados
    getTotalUsersAndFriends: (req, res) => {
        UserModel.getTotalUsers((err, totalUsers) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el total de usuarios' });
            }

            AdminModel.getTotalAssignedFriends((err, totalAssignedFriends) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al obtener el total de amigos secretos asignados' });
                }

                res.render('friend', {
                    totalUsers: totalUsers,
                    totalAssignedFriends: totalAssignedFriends,
                    friends: totalAssignedFriends
                });
            });
        });
    }
};

module.exports = adminController;