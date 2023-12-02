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

        let key = req.body.keyword_search;

        if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
            and_clauses.push({
                $or: [
                    { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
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

        let property = Property.aggregate([
            { $match: conditions },
            { $sort: { _id: -1 } }
        ]);
        if (!property) {
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
        //var options = { page: req.body.page, limit: req.body.limit };
        let allProperties = await Property.aggregatePaginate(property, options);
        return allProperties;
    }

}

module.exports = propertyRepository;