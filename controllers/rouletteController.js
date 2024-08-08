const { UserModel, AmigoSecretoModel } = require('../models/rouletteModel');

exports.assignAmigoSecreto = (req, res) => {
    const userId = req.session.id_usuario;

    UserModel.getRandomUser(userId, (err, amigo) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al asignar amigo secreto' });
        }

        AmigoSecretoModel.saveAmigoSecreto(userId, amigo.id_usuario, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Error al guardar amigo secreto' });
            }

            res.json({ success: true, amigo });
        });
    });
};

exports.getAmigoPreferences = (req, res) => {
    const userId = req.session.id_usuario;

    AmigoSecretoModel.getAmigo(userId, (err, amigo) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al obtener las preferencias del amigo secreto' });
        }

        if (!amigo) {
            return res.status(404).json({ success: false, message: 'No se encontró el amigo secreto' });
        }

        // Obtener regalos del amigo secreto
        AmigoSecretoModel.getRegalos(amigo.id_usuario, (err, regalos) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Error al obtener los regalos del amigo secreto' });
            }

            // Obtener dulces del amigo secreto
            AmigoSecretoModel.getDulces(amigo.id_usuario, (err, dulces) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: 'Error al obtener los dulces del amigo secreto' });
                }

                // Responder con toda la información
                res.json({
                    success: true,
                    amigo: {
                        ...amigo,
                        regalos: regalos.map(r => r.regalo),
                        dulces: dulces.map(d => d.dulce)
                    }
                });
            });
        });
    });
};