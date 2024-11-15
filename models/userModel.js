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
    }
};

module.exports = UserModel;