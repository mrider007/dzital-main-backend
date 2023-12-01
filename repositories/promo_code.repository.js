const Promocode = require('../models/promo_code.model');

const promocodeRepository = {

    updateById: async (data, id) => {
        try {
            let promoUpdate = await Promocode.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!promoUpdate) {
                return null;
            }
            return promoUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let promocode = await Promocode.findById(id);
            if (promocode) {
                let promocode = await Promocode.deleteOne({ _id: id }).exec();
                if (!promocode) {
                    return null;
                }
                return promocode;
            }
        } catch (e) {
            throw e;
        }
    },

    getPromoCode: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'promo_code': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
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

            let promocodes = Promocode.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!promocodes) {
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

            let allPromocodes = await Promocode.aggregatePaginate(promocodes, options);
            return allPromocodes;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = promocodeRepository;