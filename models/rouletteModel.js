// Importa la configuración de la conexión a la base de datos
const connection = require('../config/db');

// Modelo para manejar operaciones relacionadas con los usuarios
const UserModel = {
    /**
     * Obtiene un usuario aleatorio, preferiblemente de género opuesto.
     * @param {number} excludeUserId - ID del usuario que se debe excluir.
     * @param {string} userGender - Género del usuario que busca un amigo ('M' o 'F').
     * @param {Function} callback - Función para manejar el resultado o errores.
     */
    getRandomUser: (excludeUserId, userGender, callback) => {
        const oppositeGender = userGender === 'M' ? 'F' : 'M';

        // Query para buscar usuarios disponibles de género opuesto
        const queryOppositeGender = `
            SELECT u.id_usuario, u.nombres, u.genero, a.nombre AS area
            FROM usuarios u
            JOIN agencias a ON u.area = a.cu
            WHERE u.id_usuario != ? 
                AND u.genero = ? 
                AND u.id_usuario NOT IN (
                    SELECT id_amigo_secreto 
                    FROM amigos_secreto
                )
                AND u.rol = 'usuario'
            ORDER BY RAND()
            LIMIT 1;
        `;

        // Query para buscar cualquier usuario disponible
        const queryAvailableUsers = `
            SELECT u.id_usuario, u.nombres, u.genero, a.nombre AS area
            FROM usuarios u
            JOIN agencias a ON u.area = a.cu
            WHERE u.id_usuario != ? 
                AND u.id_usuario NOT IN (
                    SELECT id_amigo_secreto 
                    FROM amigos_secreto
                )
                AND u.rol = 'usuario'
            ORDER BY RAND()
            LIMIT 1;
        `;

        // Intentar primero con usuarios de género opuesto
        connection.query(queryOppositeGender, [excludeUserId, oppositeGender], (err, results) => {
            if (err) {
                return callback({ success: false, message: 'Error en la base de datos' });
            }
            if (results.length > 0) {
                return callback(null, results[0]); // Usuario encontrado del género opuesto
            }

            // Si no hay usuarios del género opuesto, buscar en general
            connection.query(queryAvailableUsers, [excludeUserId], (err, results) => {
                if (err) {
                    return callback({ success: false, message: 'Error en la base de datos' });
                }
                if (results.length > 0) {
                    return callback(null, results[0]); // Usuario encontrado
                }

                // Si no hay usuarios disponibles
                return callback({ success: false, message: 'No hay más amigos para asignar.' });
            });
        });
    }
};

// Modelo para manejar operaciones relacionadas con amigos secretos
const AmigoSecretoModel = {
    /**
     * Obtiene el amigo secreto asignado a un usuario.
     * @param {number} userId - ID del usuario.
     * @param {Function} callback - Función para manejar el resultado o errores.
     */
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
            callback(null, results[0]); // Retorna el primer resultado encontrado
        });
    },

    /**
     * Obtiene los regalos asociados a un usuario.
     * @param {number} userId - ID del usuario.
     * @param {Function} callback - Función para manejar el resultado o errores.
     */
    getRegalos: (userId, callback) => {
        const query = `SELECT regalo FROM regalos WHERE id_usuario_fk = ?;`;
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    /**
     * Obtiene los dulces asociados a un usuario.
     * @param {number} userId - ID del usuario.
     * @param {Function} callback - Función para manejar el resultado o errores.
     */
    getDulces: (userId, callback) => {
        const query = `SELECT dulce FROM dulces WHERE id_usuario_fk = ?;`;
        connection.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    /**
     * Guarda un nuevo amigo secreto y actualiza el estado del usuario.
     * @param {number} userId - ID del usuario que asigna.
     * @param {number} amigoId - ID del amigo secreto asignado.
     * @param {Function} callback - Función para manejar el resultado o errores.
     */
    saveAmigoSecreto: (userId, amigoId, callback) => {
        const insertQuery = `INSERT INTO amigos_secreto (id_usuario, id_amigo_secreto) VALUES (?, ?);`;
        const updateUserQuery = `UPDATE usuarios SET emparejado = 1 WHERE id_usuario = ?;`;

        // Insertar el amigo secreto en la tabla
        connection.query(insertQuery, [userId, amigoId], (err, result) => {
            if (err) return callback(err);

            // Actualizar el estado de emparejado del usuario
            connection.query(updateUserQuery, [userId], (err, result1) => {
                if (err) return callback(err);
                callback(null, { insertResult: result, updateResult: result1 });
            });
        });
    }
};

// Exporta los modelos para su uso en otras partes de la aplicación
module.exports = { UserModel, AmigoSecretoModel };