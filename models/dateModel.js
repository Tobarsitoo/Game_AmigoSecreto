const connection = require('../config/db');

const DateModel = {
    getDates: (callback) => {
        const query = `SELECT fecha_juego, fecha_asignacion FROM fechas_asecreto LIMIT 1;`;
        connection.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    updateDates: (fecha_juego, fecha_asignacion, callback) => {
        const query = `UPDATE fechas_asecreto SET fecha_juego = ?, fecha_asignacion = ? WHERE id_fechas = 1`;
        connection.query(query, [fecha_juego, fecha_asignacion], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = DateModel;