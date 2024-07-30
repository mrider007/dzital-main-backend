const mongoose = require("mongoose");
const ChatUser = require("../models/chat_user.model");

const ChatUserRepository = {

    list: async (req) => {
        try {

            var conditions = {};
            var and_clauses = [];

            const userId = req.user._id;

            and_clauses.push({ $or: [{ user1_id: new mongoose.Types.ObjectId(req.user._id) }, { user2_id: new mongoose.Types.ObjectId(req.user._id) }] });

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'user_name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'user_email': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            const chatusers = ChatUser.aggregate([
                {
                    $lookup: {
                        from: "users",
                        let: { user1_id: '$user1_id', user2_id: '$user2_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $ne: ["$_id", userId] },
                                            {
                                                $or: [
                                                    { $eq: ["$_id", "$$user1_id"] },
                                                    { $eq: ["$_id", "$$user2_id"] }
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
                        user1_id: { $first: '$user1_id' },
                        user2_id: { $first: '$user2_id' },
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
            ])

            var options = { page: req.body?.page || 1, limit: req.body?.limit || 20 };
            const list = await ChatUser.aggregatePaginate(chatusers, options);
            return list
        } catch (e) {
            throw e;
        }
    }
}

module.exports = ChatUserRepository