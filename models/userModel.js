const bcrypt = require('bcryptjs');
const connection = require('../config/db');

/**
 * UserModel: Modelo para manejar operaciones relacionadas con los usuarios.
 */
const UserModel = {
    /**
     * Busca un usuario por su cédula.
     * @param {string} cedula - La cédula del usuario.
     * @param {function} callback - Función de callback que retorna los resultados o un error.
     */
    findByCedula: (cedula, callback) => {
        connection.query('SELECT * FROM usuarios WHERE cedula = ?', [cedula], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    /**
     * Compara una contraseña proporcionada con su versión hash almacenada.
     * @param {string} candidatePassword - La contraseña ingresada por el usuario.
     * @param {string} hashedPassword - La contraseña hash almacenada en la base de datos.
     * @param {function} callback - Función de callback que retorna true si coinciden, false de lo contrario, o un error.
     */
    comparePassword: (candidatePassword, hashedPassword, callback) => {
        bcrypt.compare(candidatePassword, hashedPassword, (err, isMatch) => {
            if (err) return callback(err);
            callback(null, isMatch);
        });
    },

    /**
     * Busca un usuario por su ID.
     * @param {number} id - El ID del usuario.
     * @param {function} callback - Función de callback que retorna el usuario o un error.
     */
    findById: (id, callback) => {
        connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    /**
     * Obtiene todos los usuarios excepto el especificado.
     * @param {number} userId - ID del usuario que debe excluirse.
     * @param {function} callback - Función de callback que retorna la lista de usuarios o un error.
     */
    getAllUsersExceptSelf: (userId, callback) => {
        connection.query('SELECT * FROM usuarios WHERE id_usuario != ?', [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    /**
     * Obtiene todos los usuarios de la base de datos.
     * @param {function} callback - Función de callback que retorna la lista de usuarios o un error.
     */
    getAllUsers: (callback) => {
        connection.query('SELECT * FROM usuarios', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    /**
     * Agrega un nuevo usuario a la base de datos.
     * @param {object} userData - Datos del nuevo usuario.
     * @param {function} callback - Función de callback que retorna los resultados de la operación o un error.
     */
    addUser: (userData, callback) => {
        const { cedula, nombres, area, contraseña, estado, emparejado, fecha_nacimiento, genero, email, rol } = userData;
        bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
            if (err) return callback(err);

            const query = `
                INSERT INTO usuarios (cedula, nombres, area, contraseña, estado, emparejado, fecha_nacimiento, genero, email, fecha_registro, rol)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?)
            `;
            const values = [cedula, nombres, area, hashedPassword, estado, emparejado, fecha_nacimiento, genero, email, rol];
            connection.query(query, values, (error, results) => {
                if (error) return callback(error);
                callback(null, results);
            });
        });
    },

    /**
     * Edita un usuario existente en la base de datos.
     * @param {number} id - ID del usuario a editar.
     * @param {object} userData - Datos actualizados del usuario.
     * @param {function} callback - Función de callback que retorna los resultados de la operación o un error.
     */
    editUser: (id, userData, callback) => {
        const { cedula, nombres, area, estado, fecha_nacimiento, genero, rol } = userData;

        const query = `
            UPDATE usuarios 
            SET cedula = ?, nombres = ?, area = ?, estado = ?, fecha_nacimiento = ?, genero = ?, rol = ?
            WHERE id_usuario = ?
        `;
        const values = [cedula, nombres, area, estado, fecha_nacimiento, genero, rol, id];
        connection.query(query, values, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    /**
     * Elimina un usuario de la base de datos.
     * @param {number} id - ID del usuario a eliminar.
     * @param {function} callback - Función de callback que retorna los resultados de la operación o un error.
     */
    deleteUser: (id, callback) => {
        connection.query('DELETE FROM usuarios WHERE id_usuario = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    /**
     * Obtiene el total de usuarios y amigos secretos asignados.
     * @param {function} callback - Función de callback que retorna los totales o un error.
     */
    getTotalUsersAndFriends: (callback) => {
        connection.query('SELECT COUNT(*) AS total FROM usuarios WHERE rol = "usuario"', (err, userResults) => {
            if (err) return callback(err);

            connection.query('SELECT COUNT(*) AS total FROM amigos_secreto', (err, friendResults) => {
                if (err) return callback(err);

                const totalUsers = userResults[0].total;
                const totalAssignedFriends = friendResults[0].total;

                callback(null, { totalUsers, totalAssignedFriends });
            });
        });
    }
};

module.exports = UserModel;