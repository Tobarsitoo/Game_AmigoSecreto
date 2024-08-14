const { UserModel, AmigoSecretoModel } = require('../models/rouletteModel');

exports.assignAmigoSecreto = (req, res) => {
    const userId = req.session.id_usuario;

    AmigoSecretoModel.getAmigo(userId, (err, existingAmigo) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al verificar el amigo secreto' });
        }

        if (existingAmigo) {
            return res.json({ success: false, message: 'Ya tienes un amigo asignado' });
        }

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

        AmigoSecretoModel.getRegalos(amigo.id_usuario, (err, regalos) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Error al obtener los regalos del amigo secreto' });
            }

            AmigoSecretoModel.getDulces(amigo.id_usuario, (err, dulces) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: 'Error al obtener los dulces del amigo secreto' });
                }

                res.json({
                    success: true,
                    amigo: {
                        nombre: amigo.nombre,
                        primer_apellido: amigo.primer_apellido,
                        segundo_apellido: amigo.segundo_apellido,
                        area: amigo.area,
                        regalos: regalos.map(r => r.regalo),
                        dulces: dulces.map(d => d.dulce)
                    }
                });
            });
        });
    });
};
