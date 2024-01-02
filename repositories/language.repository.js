const Language = require('../models/language.model');

const languageRepository = {

    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'country_name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
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

            let languages = Language.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!languages) {
                return null;
            }

            var options = {};
            if (req.body.page !== undefined) {
                options.page = req.body.page;
            }
            if (req.body.limit !== undefined) {
                options.limit = req.body.limit;
            }
            let allLanguages = await Language.aggregatePaginate(languages, options);
            return allLanguages;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = languageRepository;