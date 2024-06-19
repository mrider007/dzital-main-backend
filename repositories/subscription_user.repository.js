const SubscriptionUser = require("../models/subscription_user.model");

const subscriptionUserRepository = {

    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ 'user_id': req.user._id });

            if (_.has(req.body, 'status') && req.body.status !== '') {
                and_clauses.push({ status: req.body.status });
            }

            if (_.has(req.body, 'isEnded')) {
                and_clauses.push({ isEnded: req.body.isEnded });
            }

            if (_.has(req.body, 'purchase_mode') && req.body.purchaseMode !== '') {
                and_clauses.push({ purchase_mode: req.body.purchase_mode });
            }

            conditions['$and'] = and_clauses;

            let SubscriptionUsers = await SubscriptionUser.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        pipeline: [
                            {
                                $group: {
                                    _id: '$_id',
                                    image: { $first: '$image' },
                                    title: { $first: '$title' },
                                    description: { $first: '$description' },
                                }
                            }
                        ],
                        foreignField: '_id',
                        as: 'product_details'
                    }
                },
                { $unwind: { path: '$product_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        let: { productId: '$product_id' },
                        from: "meetings",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$product_id", "$$productId"] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    duration: { $first: '$duration' },
                                    meetingAt: { $first: '$meetingAt' },
                                    meeting_agenda: { $first: '$meeting_agenda' },
                                }
                            },
                            {
                                $sort: { meetingAt: -1 }
                            },
                            {
                                $limit: 1
                            }
                        ],
                        as: "upcoming_meetings"
                    }
                },
                { $unwind: { path: '$upcoming_meetings', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        product_details: { $first: '$product_details' },
                        upcoming_meetings: { $first: '$upcoming_meetings' },
                        user_id: { $first: '$user_id' },
                        product_id: { $first: '$product_id' },
                        purchase_mode: { $first: '$purchase_mode' },
                        current_plan_start: { $first: '$current_plan_start' },
                        current_plan_end: { $first: '$current_plan_end' },
                        amount: { $first: '$amount' },
                        status: { $first: '$status' },
                        isEnded: { $first: '$isEnded' },
                        createdAt: { $first: '$createdAt' }
                    }
                },
                { $sort: { createdAt: -1 } }
            ]);
            return SubscriptionUsers;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = subscriptionUserRepository;