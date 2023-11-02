const User = require('../models/user.model');

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

            and_clauses.push({ '_id': req.user._id });

            conditions['$and'] = and_clauses;

            let data = await User.aggregate([
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
            return e;
        }
    }

}

module.exports = userRepository;