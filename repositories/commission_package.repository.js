const CommissionPackage = require("../models/commission_package.model")

const CommissionPackageRepository = {

    getAll: async (req) => {
        try {

            var conditions = {}
            var and_clauses = []

            and_clauses.push({});

            conditions['$and'] = and_clauses

            const list = await CommissionPackage.aggregate([
                { $match: conditions },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        commission_percentage: { $first: '$commission_percentage' },
                        type: { $first: '$type' },
                    }
                }
            ])

            return list;
        } catch (e) {
            throw e;
        }
    },

    updateOne: async (field, data) => {
        try {
            const updatePackage = await CommissionPackage.findOneAndUpdate(field, data, { $new: true, $upsert: true })
            return updatePackage
        } catch (e) {
            throw e;
        }
    }
}

module.exports = CommissionPackageRepository;