const { UserModel, AmigoSecretoModel } = require('../models/rouletteModel');
const AuditModel = require('../models/auditModel');
const DateModel = require('../models/dateModel');

// Validar y asignar amigo secreto
exports.validateAndAssignAmigoSecreto = (req, res) => {
    const userId = req.session.id_usuario;

    DateModel.getDates((err, dates) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al obtener las fechas' });
        }

        const { fecha_juego, fecha_asignacion } = dates;
        const now = new Date();

        if (now < new Date(fecha_juego) || now > new Date(fecha_asignacion)) {
            const formattedFechaJuego = new Date(fecha_juego).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
            return res.status(403).json({ 
                success: false, 
                message: `La ruleta solo puede girarse dentro del rango de fechas permitido. Podras girar la ruleta desde ${formattedFechaJuego}.`
            });
        }

        if (now >= new Date(fecha_asignacion)) {
            this.assignAmigoSecretoAutomatico(req, res);
            return;
        }

        let fechaJ = new Date(fecha_juego);
        let fecha_inicio = fechaJ.getFullYear() + '-' + (fechaJ.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaJ.getDate().toString().padStart(2, '0');

        let fechaA = new Date(fecha_asignacion);
        let fecha_fin = fechaA.getFullYear() + '-' + (fechaA.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaA.getDate().toString().padStart(2, '0');

        const data = {fecha_inicio , fecha_fin}
        return res.status(200).json({ success: true, message: 'La ruleta está habilitada para girar.' });
    });
};

// Controlador para asignar amigo secreto
exports.assignAmigoSecreto = (req, res) => {
    const userId = req.session.id_usuario;
    const userGender = req.session.genero;
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) === '::1' ? '127.0.0.1' : req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    AmigoSecretoModel.getAmigo(userId, (err, existingAmigo) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al verificar el amigo secreto' });
        }

        if (existingAmigo) {
            return res.status(202).json({ success: false, message: 'Ya tienes un amigo secreto asignado. No puedes volver a girar la ruleta.' });
        }

        UserModel.getRandomUser(userId, userGender, (err, amigo) => {
            if (err || !amigo || amigo.rol === 'administrador') {
                console.error(err || 'No se encontró un amigo.');
                return res.json({ success: false, status: 404, message: 'No hay amigos disponibles para asignar.' });
            }

            AmigoSecretoModel.saveAmigoSecreto(userId, amigo.id_usuario, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: 'Error al guardar amigo secreto' });
                }

                const detalles = `Se asignó a ${amigo.nombres} con ID: ${amigo.id_usuario} como amigo secreto.`;
                AuditModel.registrarAuditoria(userId, ip, 'Asignación de amigo secreto', detalles);

                res.status(200).json({ success: true, amigo });
            });
        });
    });
};

// Controlador para asignar amigo secreto automatico
exports.assignAmigoSecretoAutomatico = (req, res) => {
    const userId = req.session.id_usuario;
    const userGender = req.session.genero;
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) === '::1' ? '127.0.0.1' : req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    AmigoSecretoModel.getAmigo(userId, (err, existingAmigo) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al verificar el amigo secreto' });
        }

        if (existingAmigo) {
            return res.status(202).json({ success: false, message: 'Ya tienes un amigo secreto asignado. No puedes volver a girar la ruleta.' });
        }

        UserModel.getRandomUser(userId, userGender, (err, amigo) => {
            if (err || !amigo || amigo.rol === 'administrador') {
                console.error(err || 'No se encontró un amigo.');
                return res.json({ success: false, status: 404, message: 'No hay amigos disponibles para asignar.' });
            }

            AmigoSecretoModel.saveAmigoSecreto(userId, amigo.id_usuario, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: 'Error al guardar amigo secreto' });
                }

                const detalles = `Se asignó a ${amigo.nombres} con ID: ${amigo.id_usuario} como amigo secreto.`;
                AuditModel.registrarAuditoria(userId, ip, 'Asignación de amigo secreto', detalles);
            });
        });
    });
};

// Controlador para traer información del amigo secreto
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

                return res.json({
                    success: true,
                    amigo: {
                        nombre: amigo.nombres,
                        genero: amigo.genero,
                        area: amigo.area,
                        regalos: regalos.map(r => r.regalo),
                        dulces: dulces.map(d => d.dulce)
                    }
                });
            });
        });
    });
};