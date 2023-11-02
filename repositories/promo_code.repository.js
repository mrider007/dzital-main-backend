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

            if (_.isObject(req.body) && _.has(req.body, 'promo_code')) {
                and_clauses.push({ $or: [{ "promo_code": { $regex: (req.body.promo_code).trim(), $options: 'i' } }] });
            }

            conditions['$and'] = and_clauses;

            let promocodes = Promocode.aggregate([
                { $match: conditions }
            ]);
            if (!promocodes) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allPromocodes = await Promocode.aggregatePaginate(promocodes, options);
            return allPromocodes;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = promocodeRepository;