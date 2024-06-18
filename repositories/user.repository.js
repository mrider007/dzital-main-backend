const User = require('../models/user.model');
const mongoose = require('mongoose');

const userRepository = {

    save: async (data) => {
        try {
            let user = await User.create(data);
            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            return e;
        }
    },

    updateById: async (data, id) => {
        try {
            let userUpdate = await User.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!userUpdate) {
                return null;
            }
            return userUpdate;
        } catch (e) {
            return e;
        }
    },

    delete: async (id) => {
        try {
            let data = await User.findById(id);
            if (data) {
                let userDelete = await User.deleteOne({ _id: id }).exec();
                if (!userDelete) {
                    return null;
                }
                return data;
            }
        } catch (e) {
            throw e;
        }
    },

    getUserDetails: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            //and_clauses.push({ '_id': req.user._id });

            if (!_.isEmpty(req.query) && _.has(req.query, 'user_id')) {
                and_clauses.push({ '_id': new mongoose.Types.ObjectId(req.query.user_id) });
            } else {
                and_clauses.push({ '_id': req.user._id });
            }

            conditions['$and'] = and_clauses;

            let data = await User.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'membership_plans',
                        localField: 'plan_id',
                        foreignField: '_id',
                        as: 'plan_details'
                    }
                },
                { $unwind: { path: '$plan_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        email: { $first: '$email' },
                        image: { $first: '$image' },
                        mobile: { $first: '$mobile' },
                        address: { $first: '$address' },
                        bio: { $first: '$bio' },
                        social_id: { $first: '$social_id' },
                        register_type: { $first: '$register_type' },
                        plan_id: { $first: '$plan_id' },
                        plan_title: { $first: '$plan_details.title' }
                    }
                }
            ]);
            if (!data) {
                return null;
            }
            return data[0];
        } catch (e) {
            return e;
        }
    },

    getUserCountByParams: async (params) => {
        try {
            let user = await User.countDocuments(params);
            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            throw e;
        }
    },

    getUserInfo: async (params) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            conditions['$and'] = and_clauses;

            let data = await User.aggregate([
                { $match: params },
                {
                    $lookup: {
                        from: 'membership_plans',
                        localField: 'plan_id',
                        foreignField: '_id',
                        as: 'plan_details'
                    }
                },
                { $unwind: { path: '$plan_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        email: { $first: '$email' },
                        image: { $first: '$image' },
                        mobile: { $first: '$mobile' },
                        social_id: { $first: '$social_id' },
                        register_type: { $first: '$register_type' },
                        plan_id: { $first: '$plan_id' },
                        plan_title: { $first: '$plan_details.title' }
                    }
                }
            ]);

            if (!data) {
                return null;
            }
            return data[0];
        } catch (e) {
            throw e;
        }
    },

    getSellerProfile: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ _id: new mongoose.Types.ObjectId(req.body.sellerId) });

            conditions['$and'] = and_clauses;

            let data = await User.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        let: { sellerID: '$_id' },
                        from: "products",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$userId", "$$sellerID"]
                                    }
                                }
                            },
                            // {
                            //     $group: {
                            //         _id: '$_id',
                            //         booking_id: { $first: '$booking_id' },
                            //         description: { $first: '$description' },
                            //         booking_date: { $first: '$booking_date' },
                            //         patient_name: { $first: '$patient_name' },
                            //         patient_number: { $first: '$patient_number' },
                            //         doctor_name: { $first: '$doctor_name' },
                            //         doctor_number: { $first: '$doctor_number' },
                            //         partner_name: { $first: '$partner_name' },
                            //         partner_number: { $first: '$partner_number' },
                            //         tc_margin_commission: { $first: '$tc_margin_commission' },
                            //         discount_price: { $first: '$discount_price' },
                            //         final_amount: { $first: { $round: ['$final_amount', 2] } }, // Round final_amount to 2 decimal places
                            //         prescription: { $first: '$prescription' },
                            //         status: { $first: '$status' },
                            //         payment_status: { $first: '$payment_status' },
                            //         report: { $first: '$report' },
                            //         createdAt: { $first: '$createdAt' },
                            //         updatedAt: { $first: '$updatedAt' }
                            //     }
                            // }
                        ],
                        as: "seller_own_products"
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        email: { $first: '$email' },
                        image: { $first: '$image' },
                        mobile: { $first: '$mobile' },
                        address: { $first: '$address' },
                        bio: { $first: '$bio' },
                        seller_products_list: { $first: '$user_own_products' }
                    }
                }
            ]);
            if (!data) {
                return null;
            }
            return data[0];
        } catch (e) {
            throw e;
        }
    }

}

module.exports = userRepository;