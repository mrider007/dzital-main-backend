const mongoose = require('mongoose');
const Connection = require('../models/connection.model');

class ConnectionController {
    constructor() { }

    /** Send Connection Request to Another User */
    async sendConnectionRequest(req, res) {
        try {
            const senderId = req.user._id;

            if (!_.has(req.body, 'receiverId')) {
                res.status(400).send({ status: 400, message: 'Receiver Id is Required' });
            }

            const receiver = new mongoose.Types.ObjectId(req.body.receiverId);
            let checkConnection = await Connection.findOne({ senderId: senderId, receiverId: receiver, status: 'Pending' });
            if (!_.isEmpty(checkConnection)) {
                res.status(400).send({ status: 400, message: 'You Have Already Sent Connection Request' });
            }
            else {
                const sendRequest = await Connection.create(req.body);
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

}

module.exports = new ConnectionController();