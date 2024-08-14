const { DulceModel, RegaloModel } = require('../models/preferencesModel');
const AuditModel = require('../models/auditModel');

//Controlador para agregar dulce
exports.addDulce = (req, res) => {
    const { dulce } = req.body;
    const userId = req.session.id_usuario;
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) === '::1' ? '127.0.0.1' : req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (dulce) {
        DulceModel.addDulce(dulce, userId, (err, id) => {
            if (err) {
                console.error(err);
                AuditModel.registrarAuditoria(userId, ip, 'Error al agregar dulce', `Intento fallido de agregar dulce: ${dulce}`);
                return res.status(500).json({ success: false, message: 'Error al agregar dulce' });
            }
            AuditModel.registrarAuditoria(userId, ip, 'Dulce agregado', `Dulce agregado: ${dulce}`);
            res.json({ success: true, id: id, message: 'Dulce agregado exitosamente' });
        });
    } else {
        res.status(400).json({ success: false, message: 'Dulce no puede estar vacío' });
    }
};

//Controlador para agregar regalo
exports.addRegalo = (req, res) => {
    const { regalo } = req.body;
    const userId = req.session.id_usuario;
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) === '::1' ? '127.0.0.1' : req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (regalo) {
        RegaloModel.addRegalo(regalo, userId, (err, result) => {
            if (err) {
                console.error(err);
                AuditModel.registrarAuditoria(userId, ip, 'Error al agregar regalo', `Intento fallido de agregar regalo: ${regalo}`);
                return res.status(500).json({ success: false, message: 'Error al agregar regalo' });
            }
            AuditModel.registrarAuditoria(userId, ip, 'Regalo agregado', `Regalo agregado: ${regalo}`);
            res.json({ success: true, message: 'Regalo agregado exitosamente' });
        });
    } else {
        res.status(400).json({ success: false, message: 'Regalo no puede estar vacío' });
    }
};

//Controlador para obtener dulces
exports.getDulcesByUser = (req, res) => {
    const userId = req.session.id_usuario;

    DulceModel.getDulcesByUser(userId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al cargar dulces' });
        }
        res.json({ success: true, dulces: results });
    });
};

//Controlador para obtener regalos
exports.getRegalosByUser = (req, res) => {
    const userId = req.session.id_usuario;

    RegaloModel.getRegalosByUser(userId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al cargar regalos' });
        }
        res.json({ success: true, regalos: results });
    });
};

//Controlador para eliminar un dulce
exports.deleteDulce = (req, res) => {
    const dulceId = req.params.id;
    const userId = req.session.id_usuario;
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) === '::1' ? '127.0.0.1' : req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    DulceModel.deleteDulce(dulceId, (err, result) => {
        if (err) {
            console.error(err);
            AuditModel.registrarAuditoria(userId, ip, 'Error al eliminar dulce', `Intento fallido de eliminar dulce con ID: ${dulceId}`);
            return res.status(500).json({ success: false, message: 'Error al eliminar el dulce' });
        }
        AuditModel.registrarAuditoria(userId, ip, 'Dulce eliminado', `Dulce eliminado con ID: ${dulceId}`);
        res.json({ success: true, data: dulceId });
    });
};

//Controlador para eliminar un regalo
exports.deleteRegalo = (req, res) => {
    const regaloId = req.params.id;
    const userId = req.session.id_usuario;
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) === '::1' ? '127.0.0.1' : req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    RegaloModel.deleteRegalo(regaloId, (err, result) => {
        if (err) {
            console.error(err);
            AuditoriaModel.registrarAuditoria(userId, ip, 'Error al eliminar regalo', `Intento fallido de eliminar regalo con ID: ${regaloId}`);
            return res.status(500).json({ success: false, message: 'Error al eliminar el regalo' });
        }
        AuditoriaModel.registrarAuditoria(userId, ip, 'Regalo eliminado', `Regalo eliminado con ID: ${regaloId}`);
        res.json({ success: true, data: regaloId });
    });
};