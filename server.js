// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Importar las dependencias necesarias
const express = require('express');  // Framework web para Node.js
const bodyParser = require('body-parser');  // Middleware para analizar cuerpos de solicitud
const session = require('express-session');  // Middleware para manejar sesiones de usuario
const path = require('path');  // Módulo para trabajar con rutas y directorios
const authRoutes = require('./routes/authRoutes');  // Rutas de autenticación
const preferencesRoutes = require('./routes/preferencesRoutes');  // Rutas de preferencias
const rouletteRoutes = require('./routes/rouletteRoutes');  // Rutas de la ruleta (amigo secreto)
const adminRoutes = require('./routes/adminRoutes');  // Rutas para la administración
const registerRoutes = require('./routes/registerRoutes');  // Rutas de registro de usuarios
const friendRoutes = require('./routes/friendRoutes');  // Rutas para la gestión de amigos secretos

// Leer el puerto del servidor desde las variables de entorno
const PORT = process.env.SERVER_PORT;

// Crear una instancia de la aplicación Express
const app = express();

// Configurar EJS como el motor de plantillas y establecer el directorio de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Utiliza el directorio 'views' para las plantillas

// Middleware para analizar el cuerpo de las solicitudes JSON y URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de sesión para mantener la información del usuario entre las solicitudes
app.use(session({
  secret: 'secret',  // Clave secreta para firmar la sesión, debe ser cambiada por una clave más segura en producción
  resave: true,  // Fuerza a la sesión a ser guardada incluso si no ha sido modificada
  saveUninitialized: false  // No guarda sesiones nuevas si no hay datos que almacenar
}));

// Middleware para servir archivos estáticos (como CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'views')));  // Carpeta de vistas para archivos estáticos
app.use(express.static(path.join(__dirname, 'src/img')));  // Carpeta de imágenes
app.use(express.static(path.join(__dirname, 'public')));  // Carpeta pública para archivos estáticos

// Definir las rutas para diferentes partes de la aplicación
// Se organizan en módulos de rutas que se manejan en sus respectivos archivos
app.use('/', authRoutes);  // Rutas de autenticación
app.use('/', registerRoutes);  // Rutas de registro de nuevos usuarios
app.use('/', friendRoutes);  // Rutas relacionadas con los amigos secretos
app.use('/preferences', preferencesRoutes);  // Rutas para las preferencias de los usuarios
app.use('/roulette', rouletteRoutes);  // Rutas de la ruleta para asignar amigo secreto
app.use('/admin', adminRoutes);  // Rutas de administración para el acceso de los administradores

// Iniciar el servidor en el puerto configurado
app.listen(PORT, () => {
  console.log(`Servidor funcionando y corriendo en: http://localhost:${PORT}`);
});