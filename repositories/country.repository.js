const Country = require('../models/country.model');

const countryRepository = {

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

            if (_.isObject(req.body) && _.has(req.body, 'status')) {
                and_clauses.push({ 'status': req.body.status });
            }

            conditions['$and'] = and_clauses;

            let countries = Country.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);

            if (!countries) {
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

            let allCountries = await Country.aggregatePaginate(countries, options);
            return allCountries;
        } catch (e) {
            throw e;
        }
    },

    updateById: async (data, id) => {
        try {
            let countryUpdate = await Country.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!countryUpdate) {
                return null;
            }
            return countryUpdate;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = countryRepository;