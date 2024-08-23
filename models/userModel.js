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
    }
};

module.exports = UserModel;