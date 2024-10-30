exports.isAuthenticated = (req, res, next) => {
    if (req.session.loggedin) {
        next();
    } else {
        res.status(401).render('notAuthenticated');
    }
};
