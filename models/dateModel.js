// Importa la conexión a la base de datos desde la configuración.
// Esto asegura que todas las consultas realizadas utilicen una conexión centralizada.
const connection = require('../config/db');

// Define el modelo DateModel que encapsula las operaciones relacionadas con la tabla 'fechas_asecreto'.
const DateModel = {
    /**
     * Obtiene las fechas de juego y asignación desde la tabla 'fechas_asecreto'.
     * @param {function} callback - Función de devolución de llamada que maneja el resultado o el error.
     */
    getDates: (callback) => {
        // Consulta SQL para obtener las fechas necesarias, limitando a un solo registro.
        const query = `SELECT fecha_juego, fecha_asignacion FROM fechas_asecreto LIMIT 1;`;
        
        // Ejecuta la consulta en la base de datos.
        connection.query(query, (err, results) => {
            if (err) {
                // Si ocurre un error, se pasa al callback para su manejo.
                return callback(err);
            }
            // Retorna el primer resultado (ya que solo hay un registro debido al LIMIT 1).
            callback(null, results[0]);
        });
    },

    /**
     * Actualiza las fechas de juego y asignación en la tabla 'fechas_asecreto'.
     * @param {string} fecha_juego - Nueva fecha para el juego.
     * @param {string} fecha_asignacion - Nueva fecha para la asignación.
     * @param {function} callback - Función de devolución de llamada que maneja el resultado o el error.
     */
    updateDates: (fecha_juego, fecha_asignacion, callback) => {
        // Consulta SQL para actualizar las fechas en el registro con id_fechas = 1.
        const query = `UPDATE fechas_asecreto SET fecha_juego = ?, fecha_asignacion = ? WHERE id_fechas = 1`;
        
        // Ejecuta la consulta utilizando placeholders para prevenir SQL injection.
        connection.query(query, [fecha_juego, fecha_asignacion], (err, results) => {
            if (err) {
                // Si ocurre un error, se pasa al callback para su manejo.
                return callback(err);
            }
            // Retorna el resultado de la consulta al callback.
            callback(null, results);
        });
    }
};

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación.
module.exports = DateModel;