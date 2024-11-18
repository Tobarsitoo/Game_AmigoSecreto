const connection = require('../config/db');

const UserModel = {
    getRandomUser: (excludeUserId, userGender, callback) => {
        const oppositeGender = userGender === 'M' ? 'F' : 'M';

        const queryAvailableUsers = `
            SELECT u.id_usuario, u.nombres, u.genero, a.nombre AS area
            FROM usuarios u
            JOIN agencias a ON u.area = a.cu
            WHERE u.id_usuario != ? AND u.emparejado = 0
            ORDER BY RAND()
            LIMIT 1;
        `;

        const queryOppositeGender = `
            SELECT u.id_usuario, u.nombres, u.genero, a.nombre AS area
            FROM usuarios u
            JOIN agencias a ON u.area = a.cu
            WHERE u.id_usuario != ? AND u.genero = ? AND u.emparejado = 0
            ORDER BY RAND()
            LIMIT 1;
        `;

        connection.query(queryOppositeGender, [excludeUserId, oppositeGender], (err, results) => {
            if (err) {
                return callback({ success: false, message: 'Error en la base de datos' });
            }
            if (results.length > 0) {
                return callback(null, results[0]); // Usuario encontrado.
            }

            // Si no hay del género opuesto, busca en general.
            connection.query(queryAvailableUsers, [excludeUserId], (err, results) => {
                if (err) {
                    return callback({ success: false, message: 'Error en la base de datos' });
                }
                if (results.length > 0) {
                    return callback(null, results[0]); // Usuario encontrado.
                }

                // Si no hay usuarios disponibles.
                return callback({ success: false, message: 'No hay más amigos para asignar.' });
            });
        });
    }
};

const AmigoSecretoModel = {
    getAmigo: (userId, callback) => {
        const query = `
            SELECT u.id_usuario, u.nombres, u.genero, a.nombre AS area
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
        const insertQuery = `INSERT INTO amigos_secreto (id_usuario, id_amigo_secreto) VALUES (?, ?);`;
        const updateQuery = `UPDATE usuarios SET emparejado = 1 WHERE id_usuario = ?;`;

        connection.query(insertQuery, [userId, amigoId], (err, result) => {
            if (err) return callback(err);

            connection.query(updateQuery, [userId], (err, result1) => {
                if (err) return callback(err);

                connection.query(updateQuery, [amigoId], (err, result2) => {
                    if (err) return callback(err);
                    callback(null, { insertResult: result, updateResult1: result1, updateResult2: result2 });
                });
            });
        });
    }
};

module.exports = { UserModel, AmigoSecretoModel };