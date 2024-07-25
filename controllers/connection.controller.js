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
            let checkConnection = await Connection.findOne({ senderId: sender, receiverId: receiver });
            let checkRequest = await Connection.findOne({ senderId: receiver, receiverId: sender });
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

    /** User Accept / Reject Connection Request of Another User */
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

    /** User Withdraw Previous Sent Requests */
    async withdrawRequests(req, res) {
        try {
            const requestId = new mongoose.Types.ObjectId(req.params.id);

            let connectionRequest = await Connection.findOne({ _id: requestId, status: 'Pending' });
            if (!_.isEmpty(connectionRequest)) {
                let withdrawRequest = await connectionRequestRepo.delete(requestId);
                if (!_.isEmpty(withdrawRequest)) {
                    res.status(200).send({ status: 200, data: withdrawRequest, message: 'Connection Request Has Been Withdrawn' });
                } else {
                    res.status(400).send({ status: 400, message: "Connection Request could not be withdrawn" });
                }
            }
            else {
                res.status(400).send({ status: 400, message: 'Connection Request Not Found' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    /** Remove Existing Connection */
    async removeConnection(req, res) {
        try {
            const connectionId = new mongoose.Types.ObjectId(req.params.id);

            let connectionInfo = await Connection.findOne({ _id: connectionId, status: 'Accepted' });
            if (!_.isEmpty(connectionInfo) && connectionInfo._id) {
                let remove_connection = await connectionRequestRepo.delete(connectionId);
                if (!_.isEmpty(remove_connection)) {
                    res.status(200).send({ status: 200, data: remove_connection, message: 'Connection Has Been Removed' });
                } else {
                    res.status(400).send({ status: 400, message: "Connection could not be removed" });
                }
            }
            else {
                res.status(400).send({ status: 400, message: 'Connection Not Found' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    /** User Own Connections List */
    async userConnectionsList(req, res) {
        try {
            const connectionList = await connectionRequestRepo.getUserConnections(req);
            if (!_.isEmpty(connectionList)) {
                let totalConnections = await connectionRequestRepo.getConnectionsCount({ $or: [{ senderId: req.user._id }, { receiverId: req.user._id }], status: 'Accepted' });
                if (totalConnections === null) {
                    totalConnections = 0
                }
                res.status(200).send({ status: 200, data: connectionList.docs, total: connectionList.total, limit: connectionList.limit, page: connectionList.page, pages: connectionList.pages, total_connections: totalConnections, message: 'Your Connections Fetched Successfully' });
            } else {
                res.status(201).send({ status: 201, message: 'No Connection Found' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    /** User Pending Requests List */
    async userPendingRequestsList(req, res) {
        try {
            const requestsList = await connectionRequestRepo.getPendingRequests(req);
            if (!_.isEmpty(requestsList)) {
                let totalPendingRequests = await connectionRequestRepo.getConnectionsCount({ receiverId: req.user._id, status: 'Pending' });
                if (totalPendingRequests === null) {
                    totalPendingRequests = 0
                }
                res.status(200).send({ status: 200, data: requestsList.docs, total: requestsList.total, limit: requestsList.limit, page: requestsList.page, pages: requestsList.pages, total_pending_requests: totalPendingRequests, message: 'Your Pending Requests Fetched Successfully' });
            } else {
                res.status(201).send({ status: 201, message: 'No Pending Request Found' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    /** User Send Requests List */
    async userSendRequestsList(req, res) {
        try {
            const sendRequests = await connectionRequestRepo.getSendRequests(req);
            if (!_.isEmpty(sendRequests)) {
                let totalSendPendingRequests = await connectionRequestRepo.getConnectionsCount({ receiverId: req.user._id, status: 'Pending' });
                if (totalSendPendingRequests === null) {
                    totalSendPendingRequests = 0
                }
                res.status(200).send({ status: 200, data: sendRequests.docs, total: sendRequests.total, limit: sendRequests.limit, page: sendRequests.page, pages: sendRequests.pages, total_send_pending_requests: totalSendPendingRequests, message: 'Your Send Requests List Fetched Successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'User Send Requests List' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    async searchConnections(req, res) {
        try {
            const searchUsers = await connectionRequestRepo.searchConnections(req);
            if (!_.isEmpty(searchUsers)) {
                res.status(200).send({ status: 200, data: searchUsers, message: 'User List Fetched Successfully' });
            } else {
                res.status(201).send({ status: 201, message: 'No User Found' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

}

module.exports = new ConnectionController();