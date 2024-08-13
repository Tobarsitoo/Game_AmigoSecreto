const AuditModel = require('../models/auditModel');

const audit = (accion, detalles) => {
    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress || 'Unknown IP';
        const id_usuario = req.session.id_usuario || null;

        if (id_usuario) {
            AuditModel.createAuditLog(id_usuario, ip, accion, detalles)
                .then(() => {
                    next();
                })
                .catch((err) => {
                    console.error("Error creating audit log:", err);
                    next();
                });
        } else {
            next();
        }
    };
};

module.exports = audit;