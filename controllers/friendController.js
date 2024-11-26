const FriendModel = require('../models/friendModel');
const UserModel = require('../models/userModel');

exports.getAllFriends = (req, res) => {
    // Obtener los amigos asignados
    FriendModel.getAllFriends((err, friends) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al obtener los amigos asignados.' });
        }

        // Obtener el total de usuarios y amigos secretos
        UserModel.getTotalUsersAndFriends((err, { totalUsers, totalAssignedFriends }) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al obtener los totales.' });
            }

            // Renderizar la vista con los amigos y totales
            res.render('friend', { friends, totalUsers, totalAssignedFriends });
        });
    });
};