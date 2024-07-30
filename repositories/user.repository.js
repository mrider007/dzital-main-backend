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

            and_clauses.push({});

            if (!_.isEmpty(req.query) && _.has(req.query, 'user_id')) {
                and_clauses.push({ '_id': new mongoose.Types.ObjectId(req.query.user_id) });
            }
            else {
                and_clauses.push({ '_id': req.user._id });
            }

            conditions['$and'] = and_clauses;

            let data = await User.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        let: { plan: '$plan_id' },
                        from: "membership_plans",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$plan"] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "plan_details"
                    }
                },
                { $unwind: { path: '$plan_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'membership_users',
                        let: { userId: '$_id', currentTime: new Date(), status: 'Active' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$user_id", "$$userId"] },
                                            { $eq: ["$membership_status", "$$status"] },
                                            { $gt: ["$membership_end_date", "$$currentTime"] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'membership_details'
                    }
                },
                {
                    $lookup: {
                        from: "user_job_profiles",
                        let: { userID: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$userId", "$$userID"] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "job_profile_details"
                    }
                },
                { $unwind: { path: '$job_profile_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        email: { $first: '$email' },
                        image: { $first: '$image' },
                        cover_photo: { $first: '$cover_photo' },
                        mobile: { $first: '$mobile' },
                        address: { $first: '$address' },
                        user_type: { $first: '$user_type' },
                        wallet_amount: { $first: '$wallet_amount' },
                        bio: { $first: '$bio' },
                        about: { $first: '$job_profile_details.about' },
                        experience: { $first: '$job_profile_details.experience' },
                        year_of_experience: { $first: '$job_profile_details.year_of_experience' },
                        education: { $first: '$job_profile_details.education' },
                        skills: { $first: '$job_profile_details.skills' },
                        languages: { $first: '$job_profile_details.languages' },
                        company_address: { $first: '$company_address' },
                        company_contact_number: { $first: '$company_contact_number' },
                        company_email: { $first: '$company_email' },
                        company_url: { $first: '$company_url' },
                        company_name: { $first: '$company_name' },
                        bank_name: { $first: '$bank_name' },
                        account_number: { $first: '$account_number' },
                        ifsc_code: { $first: '$ifsc_code' },
                        beneficiary_name: { $first: '$beneficiary_name' },
                        country: { $first: '$country' },
                        city: { $first: '$city' },
                        state: { $first: '$state' },
                        lat: { $first: '$lat' },
                        lng: { $first: '$lng' },
                        social_id: { $first: '$social_id' },
                        register_type: { $first: '$register_type' },
                        plan_id: { $first: '$plan_id' },
                        plan_title: { $first: '$plan_details.title' },
                        membership_details: { $first: '$membership_details' }
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
                        let: { plan: '$plan_id' },
                        from: "membership_plans",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$plan"] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "plan_details"
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

            const userId = new mongoose.Types.ObjectId(req.body.userId);

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
                            {
                                $lookup: {
                                    let: { categoryID: '$category_id' },
                                    from: "service_categories",
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$categoryID"]
                                                }
                                            }
                                        }
                                    ],
                                    as: "category_details"
                                }
                            },
                            { $unwind: { path: '$category_details', preserveNullAndEmptyArrays: true } },
                            {
                                $lookup: {
                                    let: { productID: '$_id' },
                                    from: "reviews",
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$productId", "$$productID"]
                                                }
                                            }
                                        }
                                    ],
                                    as: "reviews_list"
                                }
                            },
                            // { $unwind: { path: '$category_details', preserveNullAndEmptyArrays: true } },
                            {
                                $group: {
                                    _id: '$_id',
                                    title: { $first: '$title' },
                                    description: { $first: '$description' },
                                    userId: { $first: '$userId' },
                                    status: { $first: '$status' },
                                    image: { $first: '$image' },
                                    category_id: { $first: '$category_id' },
                                    category_name: { $first: '$category_details.title' },
                                    category_slug: { $first: '$category_details.slug' },
                                    sub_category_id: { $first: '$sub_category_id' },
                                    bid_now: { $first: '$bid_now' },
                                    bid_start_price: { $first: '$bid_start_price' },
                                    bid_increament_value: { $first: '$bid_increament_value' },
                                    reviews_list: { $first: '$reviews_list' },
                                    bid_entry: { $first: '$bid_entry' },
                                    createdAt: { $first: '$createdAt' }
                                }
                            }
                        ],
                        as: "seller_own_products"
                    }
                },
                {
                    $lookup: {
                        let: { seller: '$_id' },
                        from: "connections",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $or: [
                                            {
                                                $and: [
                                                    { $eq: ["$senderId", "$$seller"] },
                                                    { $eq: ["$receiverId", userId] },
                                                    { $eq: ["$status", 'Accepted'] }
                                                ]
                                            },
                                            {
                                                $and: [
                                                    { $eq: ["$senderId", userId] },
                                                    { $eq: ["$receiverId", "$$seller"] },
                                                    { $eq: ['$status', 'Accepted'] }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "connection_details"
                    }
                },
                { $unwind: { path: '$connection_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        let: { seller: '$_id' },
                        from: "connections",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $or: [
                                            {
                                                $and: [
                                                    { $eq: ["$senderId", "$$seller"] },
                                                    { $eq: ["$receiverId", userId] },
                                                    { $eq: ["$status", 'Pending'] }
                                                ]
                                            },
                                            {
                                                $and: [
                                                    { $eq: ["$senderId", userId] },
                                                    { $eq: ["$receiverId", "$$seller"] },
                                                    { $eq: ['$status', 'Pending'] }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "pending_connection_details"
                    }
                },
                { $unwind: { path: '$pending_connection_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        let: { user: '$_id' },
                        from: "user_job_profiles",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$userId", "$$user"]
                                    }
                                }
                            }
                        ],
                        as: "job_profile_details"
                    }
                },
                { $unwind: { path: '$job_profile_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        email: { $first: '$email' },
                        image: { $first: '$image' },
                        mobile: { $first: '$mobile' },
                        address: { $first: '$address' },
                        bio: { $first: '$bio' },
                        seller_own_products: { $first: '$seller_own_products' },
                        connection_details: { $first: '$connection_details' },
                        pending_connection_details: { $first: '$pending_connection_details' },

                        about: { $first: '$job_profile_details.about' },
                        education: { $first: '$job_profile_details.education' },
                        experience: { $first: '$job_profile_details.experience' },
                        languages: { $first: '$job_profile_details.languages' },
                        skills: { $first: '$job_profile_details.skills' },
                        cover_photo: { $first: '$cover_photo' },
                        gender: { $first: '$gender' },
                        country: { $first: '$country' },
                        city: { $first: '$city' },
                        state: { $first: '$state' },
                        address: { $first: '$state' },
                        lat: { $first: '$lat' },
                        lng: { $first: '$lng' },
                        default_language: { $first: '$default_language' },
                        plan_id: { $first: '$plan_id' },
                        purchased_on: { $first: '$purchased_on' },
                        status: { $first: '$status' },
                        wallet_amount: { $first: '$wallet_amount' },
                        bank_name: { $first: '$bank_name' },
                        account_number: { $first: '$account_number' },
                        ifsc_code: { $first: '$ifsc_code' },
                        beneficiary_name: { $first: '$beneficiary_name' },
                        company_name: { $first: '$company_name' },
                        company_address: { $first: '$company_address' },
                        company_email: { $first: '$company_email' },
                        company_url: { $first: '$company_url' },
                        company_contact_number: { $first: '$company_contact_number' },
                        user_type: { $first: '$user_type' }
                    }
                },
                {
                    $addFields: {
                        isConnected: { $cond: { if: { $ne: ['$connection_details', null] }, then: true, else: false } },
                        isPending: { $cond: { if: { $ne: ['$pending_connection_details', null] }, then: true, else: false } }
                    }
                },
                {
                    $project: {
                        connection_details: 0,
                        pending_connection_details: 0
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