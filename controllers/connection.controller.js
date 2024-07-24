const mongoose = require('mongoose');
const Connection = require('../models/connection.model');

class ConnectionController {
    constructor() { }

    /** Send Connection Request to Another User */
    async sendConnectionRequest(req, res) {
        try {
            const sender = req.user._id;

            if (!_.has(req.body, 'receiverId')) {
                res.status(400).send({ status: 400, message: 'Receiver Id is Required' });
            }

            const receiver = new mongoose.Types.ObjectId(req.body.receiverId);
            let checkConnection = await Connection.findOne({ senderId: sender, receiverId: receiver, status: 'Pending' });
            let checkRequest = await Connection.findOne({ senderId: receiver, receiverId: sender, status: 'Pending' });
            if (!_.isEmpty(checkConnection) || !_.isEmpty(checkRequest)) {
                res.status(400).send({ status: 400, message: 'You Have Already Sent Connection Request' });
            }
            else {
                req.body.senderId = sender;
                const sendRequest = await Connection.create(req.body);
                if (!_.isEmpty(sendRequest) && sendRequest._id) {
                    res.status(200).send({ status: 200, data: sendRequest, message: 'Connection Request Sent Successfully' });
                } else {
                    res.status(400).send({ status: 400, message: 'Connection Request Could Not Be Sent' });
                }
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

}

module.exports = new ConnectionController();