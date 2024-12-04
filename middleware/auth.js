/**
 * Middleware para verificar si el usuario está autenticado.
 * 
 * Este middleware verifica si la sesión del usuario incluye una propiedad `loggedin`.
 * Si el usuario está autenticado (`loggedin` es verdadero), permite el acceso al siguiente middleware o ruta.
 * Si no está autenticado, responde con un estado HTTP 401 (No Autorizado) y renderiza una vista llamada `notAuthenticated`.
 * 
 * @param {object} req - Objeto de solicitud (request) de Express.
 * @param {object} res - Objeto de respuesta (response) de Express.
 * @param {function} next - Función que pasa el control al siguiente middleware o ruta.
 */
exports.isAuthenticated = (req, res, next) => {
    // Verificar si la sesión contiene la propiedad `loggedin`
    if (req.session.loggedin) {
        // Si el usuario está autenticado, continuar con el siguiente middleware o ruta
        next();
    } else {
        // Si el usuario no está autenticado, responder con un código HTTP 401 y renderizar una vista de error
        res.status(401).render('notAuthenticated');
    }
};