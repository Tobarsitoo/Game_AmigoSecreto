// Importa la configuración de la base de datos para ejecutar consultas.
const db = require('../config/db');

// Define el modelo AdminModel que encapsula las operaciones administrativas relacionadas con el sistema.
const AdminModel = {
    /**
     * Reinicia completamente el juego truncando las tablas relacionadas.
     * Incluye desactivar y reactivar las verificaciones de claves foráneas.
     * @param {function} callback - Función de devolución de llamada para manejar el resultado o el error.
     */
    resetGame: (callback) => {
        // Lista de consultas a ejecutar secuencialmente.
        const queries = [
            'SET FOREIGN_KEY_CHECKS = 0;', // Desactiva las verificaciones de claves foráneas.
            'TRUNCATE TABLE usuarios;',
            'TRUNCATE TABLE regalos;',
            'TRUNCATE TABLE dulces;',
            'TRUNCATE TABLE amigos_secreto;',
            'SET FOREIGN_KEY_CHECKS = 1;' // Reactiva las verificaciones de claves foráneas.
        ];

        // Inicia una transacción para garantizar la consistencia.
        db.beginTransaction((err) => {
            if (err) {
                console.error('Error al iniciar transacción:', err);
                return callback(err, null);
            }

            // Ejecuta cada consulta de manera secuencial.
            queries.forEach((query, index) => {
                db.query(query, (err, result) => {
                    if (err) {
                        console.error('Error en consulta:', err);
                        // Si ocurre un error, revierte la transacción.
                        return db.rollback(() => {
                            callback(err, null);
                        });
                    }

                    // Si es la última consulta, realiza el commit de la transacción.
                    if (index === queries.length - 1) {
                        db.commit((err) => {
                            if (err) {
                                console.error('Error al hacer commit:', err);
                                return db.rollback(() => {
                                    callback(err, null);
                                });
                            }
                            // Devuelve el resultado al callback al finalizar con éxito.
                            callback(null, result);
                        });
                    }
                });
            });
        });
    },

    /**
     * Reinicia únicamente la tabla de usuarios.
     * @param {function} callback - Función de devolución de llamada para manejar el resultado o el error.
     */
    resetUsers: (callback) => {
        const query = 'TRUNCATE TABLE usuarios;'; // Consulta para vaciar la tabla usuarios.
        db.query(query, (err, result) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return callback(err, null);
            }
            // Devuelve el resultado al callback si la operación es exitosa.
            callback(null, result);
        });
    },

    /**
     * Reinicia únicamente la tabla de amigos secretos.
     * Incluye un reinicio de la columna 'emparejado' en la tabla de usuarios.
     * @param {function} callback - Función de devolución de llamada para manejar el resultado o el error.
     */
    resetFriends: (callback) => {
        // Lista de consultas a ejecutar secuencialmente.
        const queries = [
            'SET FOREIGN_KEY_CHECKS = 0;', // Desactiva las verificaciones de claves foráneas.
            'UPDATE usuarios SET emparejado = 0;', // Reinicia el estado de emparejamiento.
            'TRUNCATE TABLE amigos_secreto;', // Vacía la tabla de amigos secretos.
            'SET FOREIGN_KEY_CHECKS = 1;' // Reactiva las verificaciones de claves foráneas.
        ];

        // Inicia una transacción para garantizar la consistencia.
        db.beginTransaction((err) => {
            if (err) {
                console.error('Error al iniciar transacción:', err);
                return callback(err, null);
            }

            // Ejecuta cada consulta de manera secuencial.
            queries.forEach((query, index) => {
                db.query(query, (err, result) => {
                    if (err) {
                        console.error('Error en consulta:', err);
                        // Si ocurre un error, revierte la transacción.
                        return db.rollback(() => {
                            callback(err, null);
                        });
                    }

                    // Si es la última consulta, realiza el commit de la transacción.
                    if (index === queries.length - 1) {
                        db.commit((err) => {
                            if (err) {
                                console.error('Error al hacer commit:', err);
                                return db.rollback(() => {
                                    callback(err, null);
                                });
                            }
                            // Devuelve el resultado al callback al finalizar con éxito.
                            callback(null, result);
                        });
                    }
                });
            });
        });
    }
};

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación.
module.exports = AdminModel;