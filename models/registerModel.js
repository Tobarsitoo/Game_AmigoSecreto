const connection = require('../config/db');
const bcrypt = require('bcryptjs');

const registerModel = {
    async insertUser(data) {
        const hashedPassword = await bcrypt.hash(data.cedula, 10);
        const query = `
            INSERT INTO usuarios (cedula, nombres, area, contraseña, estado, emparejado, ip_registro, fecha_nacimiento, genero, cuenta, email, rol, fecha_registro)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())
        `;

        return new Promise((resolve, reject) => {
            connection.query(query, [
                data.cedula,
                data.nombres,
                data.area,
                hashedPassword,
                1, // estado
                0, // emparejado
                data.ip_registro,
                data.fecha_nacimiento,
                data.genero,
                data.cuenta,
                data.email,
                'usuario' // rol
            ], (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }
};

module.exports = { registerModel };