// Importa la configuración de la conexión a la base de datos y el módulo bcrypt para manejar contraseñas seguras.
const connection = require('../config/db');
const bcrypt = require('bcryptjs');

// Modelo para manejar el registro de usuarios.
const registerModel = {
    /**
     * Verifica si una cédula ya existe en la base de datos.
     * @param {string} cedula - Cédula del usuario.
     * @returns {Promise<boolean>} - Devuelve `true` si la cédula existe, de lo contrario, `false`.
     */
    async checkCedulaExists(cedula) {
        const query = `SELECT COUNT(*) AS count FROM usuarios WHERE cedula = ?`;

        // Devuelve una promesa para manejar los resultados de forma asíncrona.
        return new Promise((resolve, reject) => {
            connection.query(query, [cedula], (error, results) => {
                if (error) {
                    return reject(error); // Rechaza la promesa si ocurre un error.
                }
                resolve(results[0].count > 0); // Resuelve la promesa con `true` o `false`.
            });
        });
    },

    /**
     * Inserta un nuevo usuario en la base de datos.
     * @param {Object} data - Datos del usuario a registrar.
     * @param {string} data.cedula - Cédula del usuario.
     * @param {string} data.nombres - Nombres del usuario.
     * @param {string} data.area - Área del usuario.
     * @param {string} data.ip_registro - Dirección IP del usuario al registrarse.
     * @param {string} data.fecha_nacimiento - Fecha de nacimiento del usuario.
     * @param {string} data.genero - Género del usuario.
     * @param {string} data.cuenta - Cuenta asociada al usuario.
     * @param {string} data.email - Correo electrónico del usuario.
     * @returns {Promise<Object>} - Devuelve el resultado de la operación.
     */
    async insertUser(data) {
        // Genera un hash seguro para la contraseña usando la cédula como base.
        const hashedPassword = await bcrypt.hash(data.cedula, 10);

        // Query SQL para insertar un nuevo registro en la tabla `usuarios`.
        const query = `
            INSERT INTO usuarios (cedula, nombres, area, contraseña, estado, emparejado, ip_registro, fecha_nacimiento, genero, cuenta, email, rol, fecha_registro)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())
        `;

        // Devuelve una promesa para manejar los resultados de forma asíncrona.
        return new Promise((resolve, reject) => {
            connection.query(query, [
                data.cedula,           // Cédula del usuario.
                data.nombres,          // Nombres del usuario.
                data.area,             // Área del usuario.
                hashedPassword,        // Contraseña encriptada.
                1,                     // Estado inicial (activo).
                0,                     // Estado de emparejamiento inicial (no emparejado).
                data.ip_registro,      // Dirección IP al momento de registro.
                data.fecha_nacimiento, // Fecha de nacimiento del usuario.
                data.genero,           // Género del usuario.
                data.cuenta,           // Cuenta asociada al usuario.
                data.email,            // Correo electrónico del usuario.
                'usuario'              // Rol predeterminado.
            ], (error, results) => {
                if (error) {
                    return reject(error); // Rechaza la promesa si ocurre un error.
                }
                resolve(results); // Resuelve la promesa con los resultados de la operación.
            });
        });
    }
};

// Exporta el modelo para usarlo en otras partes de la aplicación.
module.exports = { registerModel };