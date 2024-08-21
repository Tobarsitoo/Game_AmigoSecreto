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

    // saveAmigoSecreto: (userId, amigoId, callback) => {
    //     connection.query('INSERT INTO amigos_secreto (id_usuario, id_amigo_secreto) VALUES (?, ?)', [userId, amigoId], (err, results) => {
    //         if (err) {
    //             console.error('Error al insertar amigo secreto:', err);
    //             return callback(err);
    //         }
            
    //         connection.query('UPDATE usuarios SET emparejado = 1 WHERE id_usuario = ?', [userId], (updateErr, updateResults) => {
    //             if (updateErr) {
    //                 console.error('Error al actualizar el campo emparejado:', updateErr);
    //                 return callback(updateErr);
    //             }
    //             console.log('Campo emparejado actualizado:', updateResults);
    //             callback(null, updateResults);
    //         });
    //     });
    // },      

    // getAmigoSecreto: (userId, callback) => {
    //     connection.query('SELECT id_amigo_secreto FROM amigos_secreto WHERE id_usuario = ?', [userId], (err, results) => {
    //         if (err) return callback(err);
    //         callback(null, results[0] ? results[0].id_amigo_secreto : null);
    //     });
    // }
};

module.exports = UserModel;