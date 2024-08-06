const connection = require('../config/db');

const DulceModel = {
    addDulce: (dulce, userId, callback) => {
        const query = 'INSERT INTO dulces (dulce, id_usuario_fk) VALUES (?, ?)';
        connection.query(query, [dulce, userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getDulcesByUser: (userId, callback) => {
        const query = 'SELECT * FROM dulces WHERE id_usuario_fk = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

const RegaloModel = {
    addRegalo: (regalo, userId, callback) => {
        const query = 'INSERT INTO regalos (regalo, id_usuario_fk) VALUES (?, ?)';
        connection.query(query, [regalo, userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getRegalosByUser: (userId, callback) => {
        const query = 'SELECT * FROM regalos WHERE id_usuario_fk = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = { DulceModel, RegaloModel };