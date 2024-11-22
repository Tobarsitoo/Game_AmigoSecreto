const FriendModel = require('../models/friendModel');

exports.getAllFriends = (req, res) => {
    FriendModel.getAllFriends((err, friends) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al obtener los amigos asignados.' });
        }

        res.render('friend', { friends });
    });
};