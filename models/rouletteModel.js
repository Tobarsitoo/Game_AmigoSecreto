const connection = require('../config/db');

const UserModel = {
    getRandomUser: (excludeUserId, userGender, callback) => {
        const oppositeGender = userGender === 'M' ? 'F' : 'M';
        const query = `
            SELECT u.id_usuario, u.nombre, u.genero, a.nombre AS area
            FROM usuarios u
            JOIN agencias a ON u.area = a.cu
            WHERE u.id_usuario != ? AND u.genero = ?
            ORDER BY RAND()
            LIMIT 1;
        `;
        connection.query(query, [excludeUserId, oppositeGender], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }
};

const AmigoSecretoModel = {
    getAmigo: (userId, callback) => {
        const query = `
            SELECT u.id_usuario, u.nombre, u.primer_apellido, u.segundo_apellido, u.genero, a.nombre AS area
            FROM amigos_secreto am
            JOIN usuarios u ON am.id_amigo_secreto = u.id_usuario
            JOIN agencias a ON u.area = a.cu
            WHERE am.id_usuario = ?;
        `;
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    getRegalos: (userId, callback) => {
        const query = `SELECT regalo FROM regalos WHERE id_usuario_fk = ?;`;
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getDulces: (userId, callback) => {
        const query = `SELECT dulce FROM dulces WHERE id_usuario_fk = ?;`;
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    saveAmigoSecreto: (userId, amigoId, callback) => {
        const query = `INSERT INTO amigos_secreto (id_usuario, id_amigo_secreto) VALUES (?, ?);`;
        connection.query(query, [userId, amigoId], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

module.exports = { UserModel, AmigoSecretoModel };