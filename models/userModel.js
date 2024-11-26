const bcrypt = require('bcryptjs');
const connection = require('../config/db');

const UserModel = {
    findByCedula: (cedula, callback) => {
        connection.query('SELECT * FROM usuarios WHERE cedula = ?', [cedula], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    comparePassword: (candidatePassword, hashedPassword, callback) => {
        bcrypt.compare(candidatePassword, hashedPassword, (err, isMatch) => {
            if (err) return callback(err);
            callback(null, isMatch);
        });
    },

    findById: (id, callback) => {
        connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    getAllUsersExceptSelf: (userId, callback) => {
        connection.query('SELECT * FROM usuarios WHERE id_usuario != ?', [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getAllUsers: (callback) => {
        connection.query('SELECT * FROM usuarios', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    addUser: (userData, callback) => {
        const { cedula, nombres, area, contraseña, estado, emparejado, fecha_nacimiento, genero, email, rol } = userData;
        bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
            if (err) return callback(err);

            const query = `
                INSERT INTO usuarios (cedula, nombres, area, contraseña, estado, emparejado, fecha_nacimiento, genero, email, fecha_registro, rol)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?)
            `;
            const values = [cedula, nombres, area, hashedPassword, estado, emparejado, fecha_nacimiento, genero, email, rol];
            connection.query(query, values, (error, results) => {
                if (error) return callback(error);
                callback(null, results);
            });
        });
    },

    editUser: (id, userData, callback) => {
        const { cedula, nombres, area, estado, fecha_nacimiento, genero, rol } = userData;

        let query = `
            UPDATE usuarios 
            SET cedula = ?, nombres = ?, area = ?, estado = ?, fecha_nacimiento = ?, genero = ?, rol = ?
            WHERE id_usuario = ?
        `;
        const values = [cedula, nombres, area, estado, fecha_nacimiento, genero, rol, id];
        connection.query(query, values, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    deleteUser: (id, callback) => {
        connection.query('DELETE FROM usuarios WHERE id_usuario = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    // Obtener el total de usuarios y amigos secretos asignados
    getTotalUsersAndFriends: (callback) => {
        // Obtener el total de usuarios
        connection.query('SELECT COUNT(*) AS total FROM usuarios WHERE rol = "usuario"', (err, userResults) => {
            if (err) return callback(err);

            // Obtener el total de amigos secretos
            connection.query('SELECT COUNT(*) AS total FROM amigos_secreto', (err, friendResults) => {
                if (err) return callback(err);

                const totalUsers = userResults[0].total;
                const totalAssignedFriends = friendResults[0].total;

                callback(null, { totalUsers, totalAssignedFriends });
            });
        });
    }   
};

module.exports = UserModel;