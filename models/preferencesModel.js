const connection = require('../config/db');

const DulceModel = {
    //Agregar dulce
    addDulce: (dulce, userId, callback) => {
        const query = 'INSERT INTO dulces (dulce, id_usuario_fk) VALUES (?, ?)';
        connection.query(query, [dulce, userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId);
        });
    },
    
    //Obtener dulces
    getDulcesByUser: (userId, callback) => {
        const query = 'SELECT * FROM dulces WHERE id_usuario_fk = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    //Eliminar dulce
    deleteDulce: (dulceId, callback) => {
        const query = 'DELETE FROM dulces WHERE id_dulce = ?';
        connection.query(query, [dulceId], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

const RegaloModel = {
    //Agregar regalo
    addRegalo: (regalo, userId, callback) => {
        const query = 'INSERT INTO regalos (regalo, id_usuario_fk) VALUES (?, ?)';
        connection.query(query, [regalo, userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    //Obtener regalos
    getRegalosByUser: (userId, callback) => {
        const query = 'SELECT * FROM regalos WHERE id_usuario_fk = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    
    //Eliminar regalo
    deleteRegalo: (regaloId, callback) => {
        const query = 'DELETE FROM regalos WHERE id_regalo = ?';
        connection.query(query, [regaloId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = { DulceModel, RegaloModel };