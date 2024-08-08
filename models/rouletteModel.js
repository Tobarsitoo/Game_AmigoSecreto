const connection = require('../config/db');

const UserModel = {
    getRandomUser: (excludeUserId, callback) => {
        const query = `
            SELECT id_usuario, nombre, genero 
            FROM usuarios
            WHERE id_usuario != ?
            ORDER BY RAND()
            LIMIT 1
        `;
        connection.query(query, [excludeUserId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }
};

const AmigoSecretoModel = {
    saveAmigoSecreto: (userId, amigoId, callback) => {
        const query = 'INSERT INTO amigos_secreto (id_usuario, id_amigo_secreto) VALUES (?, ?)';
        connection.query(query, [userId, amigoId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getAmigo: (userId, callback) => {
        const query = `
            SELECT u.id_usuario, u.nombre, u.genero
            FROM amigos_secreto AS a
            INNER JOIN usuarios AS u ON u.id_usuario = a.id_amigo_secreto
            WHERE a.id_usuario = ?
        `;
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    getRegalos: (userId, callback) => {
        const query = 'SELECT regalo FROM regalos WHERE id_usuario_fk = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getDulces: (userId, callback) => {
        const query = 'SELECT dulce FROM dulces WHERE id_usuario_fk = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = { UserModel, AmigoSecretoModel };