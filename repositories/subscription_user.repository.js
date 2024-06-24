const { default: mongoose } = require("mongoose");
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
                { $unwind: '$product_details' },
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
                                            { $gt: ["$meetingAt", new Date()] }
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
                                    meeting_password: { $first: '$meeting_password' },
                                    meeting_join_url: { $first: '$meeting_join_url' }
                                }
                            },
                            {
                                $sort: { meetingAt: 1 }
                            },
                            {
                                $limit: 1
                            }
                        ],
                        as: "upcoming_meetings"
                    }
                },
                {
                    $addFields: {
                        upcoming_meetings: {
                            $cond: {
                                if: { $eq: ['$status', 'Active'] },
                                then: '$upcoming_meetings',
                                else: null
                            }
                        }
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
    },
    getDetails: async (id, userId) => {
        try {   
            var conditions = {};
            var and_clauses = [];
            and_clauses.push({ _id: new mongoose.Types.ObjectId(id) });
            and_clauses.push({ user_id: new mongoose.Types.ObjectId(userId) });
            conditions['$and'] = and_clauses;

            const userSubscriptionInfo = await SubscriptionUser.aggregate([
                {
                    $match: conditions,
                },
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
                                    purchase_mode: { $first: '$purchase_mode' },
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
                        from: "product_plans",
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
                                    plan_name: { $first: '$plan_name' },
                                    plan_price: { $first: '$plan_price' },
                                    plan_status: { $first: '$plan_status' },
                                    plan_interval: { $first: '$plan_interval' },
                                    plan_interval_count: { $first: '$plan_interval_count' },
                                    createdAt: { $first: '$createdAt' },
                                }
                            }
                        ],
                        as: "product_plans"
                    }
                },
                {
                    $unwind: {
                        path: '$product_plans',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'subscription_payment_histories',
                        let: { planId: '$product_plans._id', userId: '$user_id', paymentId: '$payment_id'},
                        pipeline: [ 
                            {
                                $match: {
                                     $expr: {
                                        $and: [
                                            { $eq: ["$plan_id", "$$planId"] },
                                            { $eq: ["$user_id", "$$userId"] },
                                            { $eq: ["$stripe_subs_id", "$$paymentId"] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    amount: { $first: '$amount' },
                                    current_plan_start: {$first: '$current_plan_start' },
                                    current_plan_end: {$first: '$current_plan_end' },
                                    payment_status: { $first: '$payment_status' },
                                    createdAt: { $first: '$createdAt' },
                                }
                            }
                        ],
                        as: 'subscription_history'
                    }
                },
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
                                            { $gt: ["$meetingAt", new Date()] }
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
                                    meeting_password: { $first: '$meeting_password' },
                                    meeting_join_url: { $first: '$meeting_join_url' }
                                }
                            },
                            {
                                $sort: { meetingAt: 1 }
                            },
                            {
                                $limit: 5
                            }
                        ],
                        as: "upcoming_meetings"
                    }
                },
                {
                    $addFields: {
                        upcoming_meetings: {
                            $cond: {
                                if: { $eq: ['$status', 'Active'] },
                                then: '$upcoming_meetings',
                                else: null
                            }
                        }
                    }
                },
               {
                    $group: {
                        _id: '$_id',
                        product_details: { $first: '$product_details' },
                        product_plans: { $first: '$product_plans' },
                        upcoming_meetings: { $first: '$upcoming_meetings' },
                        subscription_history: { $first: '$subscription_history' },
                        user_id: { $first: '$user_id' },
                        product_id: { $first: '$product_id' },
                        payment_id: { $first: '$payment_id' },
                        purchase_mode: { $first: '$purchase_mode' },
                        current_plan_start: { $first: '$current_plan_start' },
                        current_plan_end: { $first: '$current_plan_end' },
                        amount: { $first: '$amount' },
                        status: { $first: '$status' },
                        isEnded: { $first: '$isEnded' },
                        createdAt: { $first: '$createdAt' }
                    },
               }
            ])

            return userSubscriptionInfo[0]
        } catch (e) {
            throw e
        }
    },
    updateOne: async (field, value) => {
        try {
            const updatedSubscription = await SubscriptionUser.findOneAndUpdate(field, value, { $new: true, $upsert: true });
            if (_.isEmpty(updatedSubscription) || !updatedSubscription?._id) {
                return null;
            } else {
                return updatedSubscription;
            }
        } catch (e) {
            throw e
        }
    }
}

module.exports = subscriptionUserRepository;