const Permission = require('../models/admin_permission.model');

const permissionRepository = {

    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
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

            let permissions = Permission.aggregate([
                {
                    $lookup: {
                        from: 'admin_modules',
                        localField: 'module_id',
                        foreignField: '_id',
                        as: 'module_details'
                    }
                },
                { $unwind: { path: '$module_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'admin_actions',
                        localField: 'action_id',
                        foreignField: '_id',
                        as: 'action_details'
                    }
                },
                { $unwind: { path: '$action_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        slug: { $first: '$slug' },
                        module_id: { $first: '$module_id' },
                        action_id: { $first: '$action_id' },
                        module_name: { $first: '$module_details.name' },
                        action_name: { $first: '$action_details.name' },
                        createdAt: { $first: '$createdAt' }
                    }
                },
                { $sort: { _id: -1 } },
                { $match: conditions },
            ]);
            if (!permissions) {
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
            let allPermissions = await Permission.aggregatePaginate(permissions, options);
            return allPermissions;
        } catch (e) {
            throw e;
        }
    },

    updateById: async (data, id) => {
        try {
            let permissionUpdate = await Permission.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!permissionUpdate) {
                return null;
            }
            return permissionUpdate;                        
        } catch (e) {
            throw e;
        }
    }

}

module.exports = permissionRepository;