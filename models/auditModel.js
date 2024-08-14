const db = require('../config/db');

const AuditModel = {
    registrarAuditoria: (id_usuario, ip, accion, detalles, usuario = null) => {
        const fecha = new Date();

        const query = `
            INSERT INTO auditoria (id_usuario, ip, accion, fecha, detalles)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(query, [id_usuario, ip, accion, fecha, detalles], (err, results) => {
            if (err) {
                console.error('Error al registrar auditoría:', err);
            }
        });
    }
};

module.exports = AuditModel;