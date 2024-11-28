const db = require('../config/db');

const AdminModel = {
    // Función para truncar todas las tablas relevantes
    resetGame: (callback) => {
        const queries = [
            'SET FOREIGN_KEY_CHECKS = 0;',
            'TRUNCATE TABLE usuarios;',
            'TRUNCATE TABLE regalos;',
            'TRUNCATE TABLE dulces;',
            'TRUNCATE TABLE amigos_secreto;',
            'SET FOREIGN_KEY_CHECKS = 1;'
        ];

        // Ejecutar cada consulta por separado
        db.beginTransaction((err) => {
            if (err) {
                console.error('Error al iniciar transacción:', err);
                return callback(err, null);
            }

            // Ejecutar todas las consultas de forma secuencial
            queries.forEach((query, index) => {
                db.query(query, (err, result) => {
                    if (err) {
                        console.error('Error en consulta:', err);
                        return db.rollback(() => {
                            callback(err, null);
                        });
                    }

                    // Si es la última consulta, hacer commit
                    if (index === queries.length - 1) {
                        db.commit((err) => {
                            if (err) {
                                console.error('Error al hacer commit:', err);
                                return db.rollback(() => {
                                    callback(err, null);
                                });
                            }
                            callback(null, result);
                        });
                    }
                });
            });
        });
    },

    // Función para truncar solo la tabla de usuarios
    resetUsers: (callback) => {
        const query = 'TRUNCATE TABLE usuarios;';
        db.query(query, (err, result) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    // Función para truncar solo la tabla de amigos secretos
    resetFriends: (callback) => {
        const queries = [
            'SET FOREIGN_KEY_CHECKS = 0;',
            'UPDATE usuarios SET emparejado = 0;',
            'TRUNCATE TABLE amigos_secreto;',
            'SET FOREIGN_KEY_CHECKS = 1;'
        ];

        // Ejecutar cada consulta por separado dentro de una transacción
        db.beginTransaction((err) => {
            if (err) {
                console.error('Error al iniciar transacción:', err);
                return callback(err, null);
            }

            // Ejecutar todas las consultas de forma secuencial
            queries.forEach((query, index) => {
                db.query(query, (err, result) => {
                    if (err) {
                        console.error('Error en consulta:', err);
                        return db.rollback(() => {
                            callback(err, null);
                        });
                    }

                    // Si es la última consulta, hacer commit
                    if (index === queries.length - 1) {
                        db.commit((err) => {
                            if (err) {
                                console.error('Error al hacer commit:', err);
                                return db.rollback(() => {
                                    callback(err, null);
                                });
                            }
                            callback(null, result);
                        });
                    }
                });
            });
        });
    }
};

module.exports = AdminModel;