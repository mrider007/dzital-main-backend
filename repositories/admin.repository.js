const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const Role = require('../models/role.model');

const adminRepository = {

    getAdminDetails: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ '_id': req.user._id });

            conditions['$and'] = and_clauses;

            let data = await Admin.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'roles',
                        localField: 'role_id',
                        foreignField: '_id',
                        as: 'role_details'
                    }
                },
                { $unwind: { path: '$role_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        email: { $first: '$email' },
                        image: { $first: '$image' },
                        mobile: { $first: '$mobile' },
                        role_id: { $first: '$role_id' },
                        role: { $first: '$role_details.role' } 
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

    getUsersList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'email': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });

                // Check if keyword_search has length greater than 0
                if (key.length > 0) {
                    // Disable req.body.page and req.body.limit
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }

            conditions['$and'] = and_clauses;

            let users = User.aggregate([
                // ... (existing aggregation stages)
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);

            if (!users) {
                return null;
            }

            // Only set options if they are not disabled
            var options = {};
            if (req.body.page !== undefined) {
                options.page = req.body.page;
            }
            if (req.body.limit !== undefined) {
                options.limit = req.body.limit;
            }

            let allUsers = await User.aggregatePaginate(users, options);
            return allUsers;
        } catch (e) {
            throw e;
        }
    },

    getAdminsList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'email': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });

                // Check if keyword_search has length greater than 0
                if (key.length > 0) {
                    // Disable req.body.page and req.body.limit
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }

            let role = await Role.findOne({ 'role': 'Super Admin' });

            and_clauses.push({ role_id: { $ne: role._id } });

            conditions['$and'] = and_clauses;

            let admins = Admin.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'roles',
                        localField: 'role_id',
                        foreignField: '_id',
                        as: 'role_details'
                    }
                },
                { $unwind: { path: '$role_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        email: { $first: '$email' },
                        image: { $first: '$image' },
                        mobile: { $first: "$mobile" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                        role_id: { $first: "$role_id" },
                        role: { $first: '$role_details.role' }
                    }
                },
                { $sort: { _id: -1 } }
            ]);

            if (!admins) {
                return null;
            }

            // Only set options if they are not disabled
            var options = {};
            if (req.body.page !== undefined) {
                options.page = req.body.page;
            }
            if (req.body.limit !== undefined) {
                options.limit = req.body.limit;
            }

            let allAdmins = await Admin.aggregatePaginate(admins, options);
            return allAdmins;
        } catch (e) {
            throw e;
        }
    },

    updateById: async (data, id) => {
        try {
            let adminUpdate = await Admin.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!adminUpdate) {
                return null;
            }
            return adminUpdate;
        } catch (e) {
            throw e;
        }
    },

    getUserInfo: async (params) => {
        try {
            let user = await User.findOne(params).exec();
            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let user = await User.findById(id);
            if (user) {
                let userDelete = await User.deleteOne({ _id: id }).exec();
                if (!userDelete) {
                    return null;
                }
                return user;
            }
        } catch (e) {
            throw e;
        }
    },

    getUserById: async (id) => {
        try {
            let user = await User.findById(id).lean().exec();
            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            throw e;
        }
    },

    save: async (data) => {
        try {
            let user = await User.create(data);
            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = adminRepository;