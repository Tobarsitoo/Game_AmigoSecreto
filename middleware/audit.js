// Se requiere el modelo de auditoría para registrar los logs en la base de datos
const AuditModel = require('../models/auditModel');

/**
 * Middleware para auditar acciones de usuario.
 * 
 * Este middleware registra un log de auditoría cada vez que un usuario realiza una acción.
 * Si el usuario está autenticado, se crea un log con su ID, la IP del usuario, la acción realizada
 * y detalles adicionales de la acción. En caso de error al crear el log, se maneja el error y se
 * continúa con la ejecución de la siguiente función en la cadena de middlewares o ruta.
 * 
 * @param {string} accion - Descripción breve de la acción realizada por el usuario.
 * @param {string} detalles - Detalles adicionales sobre la acción realizada.
 * @returns {function} Middleware de auditoría.
 */
const audit = (accion, detalles) => {
    return (req, res, next) => {
        // Obtener la IP del usuario. Se verifica si está en `req.ip` o `req.connection.remoteAddress`
        const ip = req.ip || req.connection.remoteAddress || 'Unknown IP';
        
        // Obtener el ID del usuario desde la sesión
        const id_usuario = req.session.id_usuario || null;

        // Si el usuario está autenticado (se tiene un `id_usuario`), registrar el log de auditoría
        if (id_usuario) {
            // Llamar al método `createAuditLog` del modelo de auditoría, pasando los parámetros necesarios
            AuditModel.createAuditLog(id_usuario, ip, accion, detalles)
                .then(() => {
                    // Si el log se crea correctamente, continuar con el siguiente middleware o ruta
                    next();
                })
                .catch((err) => {
                    // Si ocurre un error al crear el log, se registra el error en la consola y se continúa
                    console.error("Error creating audit log:", err);
                    next();
                });
        } else {
            // Si no hay un `id_usuario`, continuar sin registrar el log
            next();
        }
    };
};

module.exports = audit;