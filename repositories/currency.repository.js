const Currency = require('../models/currency.model');

const currencyRepository = {

    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'currency_name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
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

            let currency = Currency.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!currency) {
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
            let allCurrencies = await Currency.aggregatePaginate(currency, options);
            return allCurrencies;
        } catch (e) {
            throw e;
        }
    },

    updateById: async (data, id) => {
        try {
            let currencyUpdate = await Currency.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!currencyUpdate) {
                return null;
            }
            return currencyUpdate;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = currencyRepository;