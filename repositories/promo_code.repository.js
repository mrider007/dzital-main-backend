const Promocode = require('../models/promo_code.model');

const promocodeRepository = {

    list: async (req) => {
        try {
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

            let promo_code = Promocode.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!promo_code) {
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

            let allPromocodes = await Promocode.aggregatePaginate(promo_code, options);
            return allPromocodes;
        } catch (e) {
            throw e;
        }
    }, 

    updateById: async (data, id) => {
        try {
            let promocodeUpdate = await Promocode.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!promocodeUpdate) {
                return null;
            }
            return promocodeUpdate;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = promocodeRepository;