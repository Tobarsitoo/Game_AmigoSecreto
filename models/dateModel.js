const connection = require('../config/db');

const DateModel = {
    getDates: (callback) => {
        const query = `SELECT fecha_juego, fecha_asignacion FROM fechas_asecreto LIMIT 1;`;
        connection.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }
};

module.exports = DateModel;