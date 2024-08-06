// preferencesController.js
const { DulceModel, RegaloModel } = require('../models/preferencesModel');

exports.addDulce = (req, res) => {
    const { dulce } = req.body;
    const userId = req.session.id_usuario;

    if (dulce) {
        DulceModel.addDulce(dulce, userId, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Error al agregar dulce' });
            }
            res.json({ success: true, message: 'Dulce agregado exitosamente' });
        });
    } else {
        res.status(400).json({ success: false, message: 'Dulce no puede estar vacío' });
    }
};

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