const Role = require('../models/role.model');

const roleRepository = {

    updateById: async (data, id) => {
        try {
            let roleUpdate = await Role.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!roleUpdate) {
                return null;
            }
            return roleUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let role = await Role.findById(id);
            if (role) {
                let roleDelete = await Role.deleteOne({ _id: id }).exec();
                if (!roleDelete) {
                    return null;
                }
                return role;
            }
        } catch (e) {
            throw e;
        }
    },

    getRoles: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({  });

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'role': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let roles = Role.aggregate([
                { $match: conditions }
            ]);
            var options = { page: req.body.page, limit: req.body.limit };
            let allRoles = await Role.aggregatePaginate(roles, options);
            return allRoles;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = roleRepository;