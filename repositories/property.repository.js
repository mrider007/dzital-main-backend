const Property = require('../models/property.model');

const propertyRepository = {

    updateById: async (data, id) => {
        try {
            let propertyUpdate = await Property.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!propertyUpdate) {
                return null;
            }
            return propertyUpdate;
        } catch (e) {
            throw e;
        }
    },

    list: async (req) => {
        var conditions = {};
        var and_clauses = [];

        and_clauses.push({});

        conditions['$and'] = and_clauses;

        let property = Property.aggregate([
            { $match: conditions },
            { $sort: { _id: 1 } }
        ]);
        if (!property) {
            return null;
        }
        var options = { page: req.body.page, limit: req.body.limit };
        let allProperties = await Property.aggregatePaginate(property, options);
        return allProperties;
    }

}

module.exports = propertyRepository;