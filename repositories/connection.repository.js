const mongoose = require('mongoose');
const Connection = require('../models/connection.model');
const User = require('../models/user.model');

const connectionRepository = {

    updateById: async (data, id) => {
        try {
            let connectionrequestUpdate = await Connection.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!connectionrequestUpdate) {
                return null;
            }
            return connectionrequestUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let lesson_course = await Connection.findById(id);
            if (lesson_course) {
                let lessoncourseDelete = await Connection.deleteOne({ _id: id }).exec();
                if (!lessoncourseDelete) {
                    return null;
                }
                return lesson_course;
            }
        } catch (e) {
            throw e;
        }
    },

    getConnectionsCount: async (params) => {
        try {
            let total_connections = await Connection.countDocuments(params);
            if (!total_connections) {
                return null;
            }
            return total_connections;
        } catch (e) {
            throw e;
        }
    },

    searchConnections: async (req) => {
        try {

            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ _id: { $ne: req.user._id } });

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'email': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let users = await User.aggregate([
                {
                    $group: {
                        _id: '$_id',
                        status: { $first: '$status' },
                        name: { $first: '$name' },
                        email: { $first: '$email' },
                        image: { $first: '$image' },
                        createdAt: { $first: '$createdAt' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);

            if (!users) {
                return null;
            }

            return users;
        } catch (e) {
            throw e;
        }
    },

    getUserConnections: async (req) => {
        try {

            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ $or: [{ senderId: req.user._id }, { receiverId: req.user._id }], status: 'Accepted' });

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'user_name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'user_email': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });

                // Check if keyword_search has length greater than 0
                if (req.body.keyword_search.length > 0) {
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }

            conditions['$and'] = and_clauses;

            const userId = req.user._id;

            let connectionsList = Connection.aggregate([
                {
                    $lookup: {
                        from: "users",
                        let: { sender: '$senderId', receiver: '$receiverId' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $ne: ["$_id", userId] },
                                            {
                                                $or: [
                                                    { $eq: ["$_id", "$$sender"] },
                                                    { $eq: ["$_id", "$$receiver"] }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "user_details"
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        senderId: { $first: '$senderId' },
                        receiverId: { $first: '$receiverId' },
                        status: { $first: '$status' },
                        user_name: { $first: '$user_details.name' },
                        user_email: { $first: '$user_details.email' },
                        user_image: { $first: '$user_details.image' },
                        user_mobile: { $first: '$user_details.mobile' },
                        user_address: { $first: '$user_details.address' },
                        createdAt: { $first: '$createdAt' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);

            if (!connectionsList) {
                return null;
            }

            var options = {};
            if (req.body.page !== undefined) {
                options.page = req.body.page;
            }
            if (req.body.limit !== undefined) {
                options.limit = req.body.limit;
            }

            let userConnections = await Connection.aggregatePaginate(connectionsList, options);
            return userConnections;
        } catch (e) {
            throw e;
        }
    },

    getPendingRequests: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ receiverId: req.user._id, status: 'Pending' });

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'user_name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'user_email': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });

                if (req.body.keyword_search.length > 0) {
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }

            conditions['$and'] = and_clauses;

            let requestsList = Connection.aggregate([
                {
                    $lookup: {
                        let: { user: '$senderId' },
                        from: "users",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$user"] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "user_details"
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        senderId: { $first: '$senderId' },
                        receiverId: { $first: '$receiverId' },
                        status: { $first: '$status' },
                        user_name: { $first: '$user_details.name' },
                        user_email: { $first: '$user_details.email' },
                        user_image: { $first: '$user_details.image' },
                        user_mobile: { $first: '$user_details.mobile' },
                        user_address: { $first: '$user_details.address' },
                        createdAt: { $first: '$createdAt' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);

            if (!requestsList) {
                return null;
            }

            var options = {};
            if (req.body.page !== undefined) {
                options.page = req.body.page;
            }
            if (req.body.limit !== undefined) {
                options.limit = req.body.limit;
            }

            let userConnectionRequests = await Connection.aggregatePaginate(requestsList, options);
            return userConnectionRequests;
        } catch (e) {
            throw e;
        }
    },

    getSendRequests: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ senderId: req.user._id, status: 'Pending' });

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'user_name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'user_email': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });

                if (req.body.keyword_search.length > 0) {
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }

            conditions['$and'] = and_clauses;

            let requestsList = Connection.aggregate([
                {
                    $lookup: {
                        let: { user: '$receiverId' },
                        from: "users",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$user"] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "user_details"
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        senderId: { $first: '$senderId' },
                        receiverId: { $first: '$receiverId' },
                        status: { $first: '$status' },
                        user_name: { $first: '$user_details.name' },
                        user_email: { $first: '$user_details.email' },
                        user_image: { $first: '$user_details.image' },
                        user_mobile: { $first: '$user_details.mobile' },
                        user_address: { $first: '$user_details.address' },
                        createdAt: { $first: '$createdAt' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);

            if (!requestsList) {
                return null;
            }

            var options = {};
            if (req.body.page !== undefined) {
                options.page = req.body.page;
            }
            if (req.body.limit !== undefined) {
                options.limit = req.body.limit;
            }

            let userConnectionRequests = await Connection.aggregatePaginate(requestsList, options);
            return userConnectionRequests;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = connectionRepository;