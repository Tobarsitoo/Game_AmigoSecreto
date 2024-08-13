const { DulceModel, RegaloModel } = require('../models/preferencesModel');

//Controlador para agregar dulce
exports.addDulce = (req, res) => {
    const { dulce } = req.body;
    const userId = req.session.id_usuario;

    if (dulce) {
        DulceModel.addDulce(dulce, userId, (err, id) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Error al agregar dulce' });
            }
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

    if (regalo) {
        RegaloModel.addRegalo(regalo, userId, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Error al agregar regalo' });
            }
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
    const dulceId = req.params.id
    DulceModel.deleteDulce(dulceId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al eliminar el dulce' });
        }
        res.json({ success: true, data: dulceId });
    });
};

//Controlador para eliminar un regalo
exports.deleteRegalo = (req, res) => {
    const regaloId = req.params.id;
    RegaloModel.deleteRegalo(regaloId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al eliminar el regalo' });
        }
        res.json({ success: true, data: regaloId });
    });
};