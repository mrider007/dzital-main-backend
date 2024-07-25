const mongoose = require("mongoose");
const ChatUser = require("../models/chat_user.model");

const ChatUserRepository = {

    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({
                $or: [
                    { user1_id: new mongoose.Types.ObjectId(req.user._id) },
                    { user2_id: new mongoose.Types.ObjectId(req.user._id) },
                ]
            })

            conditions['$and'] = and_clauses

            const chat_user_list = ChatUser.aggregate([
                {
                    $match: conditions
                },
                {
                    $lookup: {
                        from: 'users',
                        let: { userId: '$user1_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$userId"] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    name: { $first: '$name' },
                                    image: { $first: '$image' },
                                }
                            }
                        ],
                        as: 'user1'
                    }
                },
                { $unwind: '$user1' },
                {
                    $lookup: {
                        from: 'users',
                        let: { userId: '$user2_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$userId"] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    name: { $first: '$name' },
                                    image: { $first: '$image' },
                                }
                            }
                        ],
                        as: 'user2'
                    }
                },
                { $unwind: '$user2' },
                {
                    $group: {
                        _id: '$_id',
                        user1: { $first: '$user1' },
                        user2: { $first: '$user2' }
                    }
                }
            ])

            var options = { page: req.body?.page || 1, limit: req.body?.limit || 20 };
            const list = await ChatUser.aggregatePaginate(chat_user_list, options);

            return list;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ChatUserRepository;