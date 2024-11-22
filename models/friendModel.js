const connection = require('../config/db');

const FriendModel = {
    getAllFriends: (callback) => {
        const query = `
            SELECT 
                am.id_usuario AS usuario_id, 
                u1.nombres AS usuario_nombre, 
                u1.genero AS usuario_genero, 
                am.id_amigo_secreto AS amigo_id, 
                u2.nombres AS amigo_nombre, 
                u2.genero AS amigo_genero, 
                a.nombre AS amigo_area
            FROM amigos_secreto am
            JOIN usuarios u1 ON am.id_usuario = u1.id_usuario
            JOIN usuarios u2 ON am.id_amigo_secreto = u2.id_usuario
            JOIN agencias a ON u2.area = a.cu;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error retrieving friends:', err);
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = FriendModel;