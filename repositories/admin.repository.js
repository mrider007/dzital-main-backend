const Admin = require('../models/admin.model');
const User = require('../models/user.model');

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
                    $project: {
                        'password': 0,
                        'createdAt': 0,
                        'updatedAt': 0
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

            if (_.isObject(req.body) && _.has(req.body, 'name')) {
                and_clauses.push({ $or: [{ "name": { $regex: (req.body.name).trim(), $options: 'i' } }] });
            }

            if (_.isObject(req.body) && _.has(req.body, 'email')) {
                and_clauses.push({ $or: [{ "email": { $regex: (req.body.email).trim(), $options: 'i' } }] });
            }

            conditions['$and'] = and_clauses;

            let users = User.aggregate([
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        email: { $first: '$email' },
                        image: { $first: '$image' },
                        mobile: { $first: '$mobile' },
                        social_id: { $first: '$social_id' },
                        register_type: { $first: '$register_type' },
                        createdAt: { $first: '$createdAt' }
                    }
                },
                { $match: conditions }
            ]);
            if (!users) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allUsers = await User.aggregatePaginate(users, options);
            return allUsers;
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
    }

}

module.exports = adminRepository;