const db = require('../config/db');

const AuditModel = {
    registrarAuditoria: (ip, accion, detalles, usuario) => {
        const fecha = new Date();

        const query = `
            INSERT INTO auditoria (ip, accion, fecha, detalles)
            VALUES (?, ?, ?, ?)
        `;

        db.query(query, [ip, accion, fecha, detalles], (err, results) => {
            if (err) {
                console.error('Error al registrar auditoría:', err);
            }
        });
    }
};

module.exports = AuditModel;