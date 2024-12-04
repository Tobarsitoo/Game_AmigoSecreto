// Importa la configuración de la conexión a la base de datos.
const connection = require('../config/db');

// Modelo para manejar las operaciones relacionadas con la tabla `dulces`.
const DulceModel = {
    /**
     * Agrega un dulce a la base de datos.
     * @param {string} dulce - Nombre del dulce a agregar.
     * @param {number} userId - ID del usuario asociado al dulce.
     * @param {function} callback - Función de devolución de llamada para manejar resultados o errores.
     */
    addDulce: (dulce, userId, callback) => {
        const query = 'INSERT INTO dulces (dulce, id_usuario_fk) VALUES (?, ?)';
        connection.query(query, [dulce, userId], (err, results) => {
            if (err) {
                return callback(err); // Manejo de errores.
            }
            callback(null, results.insertId); // Devuelve el ID del dulce insertado.
        });
    },

    /**
     * Obtiene todos los dulces asociados a un usuario.
     * @param {number} userId - ID del usuario.
     * @param {function} callback - Función de devolución de llamada para manejar resultados o errores.
     */
    getDulcesByUser: (userId, callback) => {
        const query = 'SELECT * FROM dulces WHERE id_usuario_fk = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err); // Manejo de errores.
            }
            callback(null, results); // Devuelve la lista de dulces.
        });
    },

    /**
     * Elimina un dulce de la base de datos.
     * @param {number} dulceId - ID del dulce a eliminar.
     * @param {function} callback - Función de devolución de llamada para manejar resultados o errores.
     */
    deleteDulce: (dulceId, callback) => {
        const query = 'DELETE FROM dulces WHERE id_dulce = ?';
        connection.query(query, [dulceId], (err, result) => {
            if (err) {
                return callback(err); // Manejo de errores.
            }
            callback(null, result); // Devuelve el resultado de la operación.
        });
    }
};

// Modelo para manejar las operaciones relacionadas con la tabla `regalos`.
const RegaloModel = {
    /**
     * Agrega un regalo a la base de datos.
     * @param {string} regalo - Nombre del regalo a agregar.
     * @param {number} userId - ID del usuario asociado al regalo.
     * @param {function} callback - Función de devolución de llamada para manejar resultados o errores.
     */
    addRegalo: (regalo, userId, callback) => {
        const query = 'INSERT INTO regalos (regalo, id_usuario_fk) VALUES (?, ?)';
        connection.query(query, [regalo, userId], (err, results) => {
            if (err) {
                return callback(err); // Manejo de errores.
            }
            callback(null, results); // Devuelve el resultado de la operación.
        });
    },

    /**
     * Obtiene todos los regalos asociados a un usuario.
     * @param {number} userId - ID del usuario.
     * @param {function} callback - Función de devolución de llamada para manejar resultados o errores.
     */
    getRegalosByUser: (userId, callback) => {
        const query = 'SELECT * FROM regalos WHERE id_usuario_fk = ?';
        connection.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err); // Manejo de errores.
            }
            callback(null, results); // Devuelve la lista de regalos.
        });
    },

    /**
     * Elimina un regalo de la base de datos.
     * @param {number} regaloId - ID del regalo a eliminar.
     * @param {function} callback - Función de devolución de llamada para manejar resultados o errores.
     */
    deleteRegalo: (regaloId, callback) => {
        const query = 'DELETE FROM regalos WHERE id_regalo = ?';
        connection.query(query, [regaloId], (err, results) => {
            if (err) {
                return callback(err); // Manejo de errores.
            }
            callback(null, results); // Devuelve el resultado de la operación.
        });
    }
};

// Exporta ambos modelos para su uso en otras partes de la aplicación.
module.exports = { DulceModel, RegaloModel };