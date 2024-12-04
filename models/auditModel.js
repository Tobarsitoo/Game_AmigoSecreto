// Importa la conexión a la base de datos desde la configuración.
// Esto asegura que todas las operaciones con la base de datos utilicen la misma conexión configurada.
const db = require('../config/db');

// Define el modelo AuditModel que encapsula las operaciones relacionadas con la tabla 'auditoria'.
const AuditModel = {
    /**
     * Registra una entrada en la tabla de auditoría.
     * @param {number} id_usuario - Identificador del usuario que realizó la acción.
     * @param {string} ip - Dirección IP desde la cual se realizó la acción.
     * @param {string} accion - Acción realizada por el usuario.
     * @param {string} detalles - Información adicional sobre la acción.
     */
    registrarAuditoria: (id_usuario, ip, accion, detalles) => {
        // Obtiene la fecha actual en formato de objeto Date.
        const fecha = new Date();

        // Consulta SQL para insertar un nuevo registro en la tabla 'auditoria'.
        const query = `
            INSERT INTO auditoria (id_usuario, ip, accion, fecha, detalles)
            VALUES (?, ?, ?, ?, ?)
        `;

        // Ejecuta la consulta utilizando placeholders para proteger contra SQL injection.
        db.query(query, [id_usuario, ip, accion, fecha, detalles], (err, results) => {
            if (err) {
                // Maneja errores en la ejecución de la consulta.
                console.error('Error al registrar auditoría:', err);
                return; // Asegura que no se continúa con lógica adicional en caso de error.
            }

            // Log para confirmar que la auditoría fue registrada correctamente.
            console.log('Auditoría registrada con éxito:', results.insertId);
        });
    }
};

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación.
module.exports = AuditModel;