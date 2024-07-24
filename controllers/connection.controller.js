const mongoose = require('mongoose');
const Connection = require('../models/connection.model');
const connectionRequestRepo = require('../repositories/connection.repository');

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

    async connectionRequestApproveReject(req, res) {
        try {
            const requestId = new mongoose.Types.ObjectId(req.params.id);

            let connectionRequest = await Connection.findOne({ _id: requestId, status: 'Pending' });
            if (!_.isEmpty(connectionRequest)) {
                let requestApproveReject = await connectionRequestRepo.updateById(req.body, requestId);
                if (!_.isEmpty(requestApproveReject) && requestApproveReject.status === 'Accepted') {
                    res.status(200).send({ status: 200, data: requestApproveReject, message: 'Connection Request Has Been Accepted' });
                } else if (!_.isEmpty(requestApproveReject) && requestApproveReject.status === 'Rejected') {
                    res.status(200).send({ status: 200, data: requestApproveReject, message: 'Connection Request Has Been Rejected' });
                } else {
                    res.status(400).send({ status: 400, message: 'Connection Request could not be updated' });
                }
            }
            else {
                res.status(400).send({ status: 400, message: 'Connection Request Not Found' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    async userConnectionsList(req, res) {
        try {
            const connectionList = await connectionRequestRepo.getUserConnections(req);
            if (!_.isEmpty(connectionList)) {
                const totalConnections = await connectionRequestRepo.getConnectionsCount({ receiverId: req.user._id, status: 'Accepted' });
                res.status(200).send({ status: 200, data: connectionList.docs, total: connectionList.total, limit: connectionList.limit, page: connectionList.page, pages: connectionList.pages, total_connections: totalConnections, message: 'Your Connections Fetched Successfully' });
            } else {
                res.status(200).send({ status: 200, message: 'No Connection Found' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

}

module.exports = new ConnectionController();