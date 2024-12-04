// Importa la configuración de la conexión a la base de datos.
const connection = require('../config/db');

// Define el modelo FriendModel que encapsula las operaciones relacionadas con los amigos secretos.
const FriendModel = {
    /**
     * Recupera una lista de todos los amigos secretos junto con información detallada.
     * Incluye datos del usuario, su amigo secreto y el área del amigo secreto.
     * @param {function} callback - Función de devolución de llamada para manejar los resultados o errores.
     */
    getAllFriends: (callback) => {
        // Consulta SQL para obtener información de la tabla `amigos_secreto` junto con datos relacionados.
        const query = `
            SELECT 
                am.id_usuario AS usuario_id,                -- ID del usuario que tiene asignado un amigo.
                u1.nombres AS usuario_nombre,              -- Nombre del usuario.
                u1.genero AS usuario_genero,               -- Género del usuario.
                am.id_amigo_secreto AS amigo_id,           -- ID del amigo secreto asignado.
                u2.nombres AS amigo_nombre,                -- Nombre del amigo secreto.
                u2.genero AS amigo_genero,                 -- Género del amigo secreto.
                a.nombre AS amigo_area                     -- Área del amigo secreto.
            FROM amigos_secreto am
            JOIN usuarios u1 ON am.id_usuario = u1.id_usuario      -- Une con la tabla de usuarios para obtener datos del usuario.
            JOIN usuarios u2 ON am.id_amigo_secreto = u2.id_usuario -- Une con la tabla de usuarios para obtener datos del amigo secreto.
            JOIN agencias a ON u2.area = a.cu;                     -- Une con la tabla de agencias para obtener el área del amigo secreto.
        `;

        // Ejecuta la consulta y maneja el resultado.
        connection.query(query, (err, results) => {
            if (err) {
                // Registra un mensaje de error si la consulta falla.
                console.error('Error retrieving friends:', err);
                return callback(err); // Devuelve el error a través del callback.
            }
            // Devuelve los resultados al callback en caso de éxito.
            callback(null, results);
        });
    }
};

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación.
module.exports = FriendModel;