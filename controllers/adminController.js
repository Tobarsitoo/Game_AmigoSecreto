const UserModel = require('../models/userModel');

const adminController = {
    getAllUsers: (req, res) => {
        UserModel.getAllUsers((err, users) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los usuarios' });
            }
            res.json(users);
        });
    }
};

module.exports = adminController;