// Cargar variables de entorno desde un archivo .env
require('dotenv').config();

// Requerir el módulo mysql2 para interactuar con la base de datos MySQL
const mysql = require('mysql2');

/**
 * Crear una conexión a la base de datos MySQL utilizando las variables de entorno
 * configuradas en el archivo .env.
 * 
 * Las variables de entorno deben incluir:
 * - DB_HOST: la dirección del host de la base de datos.
 * - DB_USERNAME: el nombre de usuario para la conexión.
 * - DB_PASSWORD: la contraseña del usuario.
 * - DB_DATABASE: el nombre de la base de datos a utilizar.
 */
const connection = mysql.createConnection({
    host: process.env.DB_HOST,          // Dirección del servidor de la base de datos
    user: process.env.DB_USERNAME,      // Nombre de usuario para acceder a la base de datos
    password: process.env.DB_PASSWORD,  // Contraseña para el usuario de la base de datos
    database: process.env.DB_DATABASE   // Nombre de la base de datos a la que se conectará
});

/**
 * Establecer la conexión a la base de datos y manejar posibles errores.
 * Si la conexión es exitosa, se muestra un mensaje en la consola.
 * Si ocurre un error al conectar, se registra el error en la consola.
 */
connection.connect((err) => {
    if (err) {
        // Si ocurre un error al conectar, mostrar un mensaje de error en la consola
        console.error('Error connecting to the database:', err);
        return;
    }
    // Si la conexión es exitosa, mostrar un mensaje en la consola
    console.log('Conexión con BD exitosa!');
});

// Exportar la conexión para ser utilizada en otros módulos de la aplicación
module.exports = connection;