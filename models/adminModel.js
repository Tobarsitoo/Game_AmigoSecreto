const db = require('../config/db');

const AdminModel = {
    // Función para truncar todas las tablas relevantes
    resetGame: (callback) => {
        const query = `
            TRUNCATE TABLE usuarios;
            TRUNCATE TABLE regalos;
            TRUNCATE TABLE dulces;
            TRUNCATE TABLE amigos_secreto;
        `;
        db.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    // Función para truncar solo la tabla de usuarios
    resetUsers: (callback) => {
        const query = 'TRUNCATE TABLE usuarios;';
        db.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    // Función para truncar solo la tabla de amigos secretos
    resetFriends: (callback) => {
        const query = 'TRUNCATE TABLE amigos_secreto;';
        db.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    }
};

module.exports = AdminModel;