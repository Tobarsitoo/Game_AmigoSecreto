const db = require('../config/db');

const AuditModel = {
    createAuditLog: (id_usuario, ip, accion, detalles) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO auditoria (id_usuario, ip, accion, detalles) VALUES (?, ?, ?, ?)`;
            db.query(query, [id_usuario, ip, accion, detalles], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
};

module.exports = AuditModel;