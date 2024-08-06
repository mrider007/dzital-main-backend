const { default: mongoose } = require('mongoose');
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
            if(_.isObject(req.body) && _.has(req.body, 'category_id')){
                and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
            }
            if(_.isObject(req.body) && _.has(req.body, 'status')){
                and_clauses.push({ 'status': req.body.status });
            }
            if(_.isObject(req.body) && _.has(req.body, 'expiry_date')){
                const currentDate = new Date()
                and_clauses.push({ 'expiry_date': { $gt: currentDate } });
            }

            conditions['$and'] = and_clauses;

            let promo_code = Promocode.aggregate([
                {
                    $lookup: {
                        let: { category: '$category_id' },
                        from: "service_categories",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$category"] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    title: { $first: '$title' }
                                }
                            }
                        ],
                        as: "category_details"
                    }
                },
                { $unwind: { path: '$category_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        category_id : { $first: '$category_id' },
                        category_name: { $first: '$category_details.title' },
                        title : { $first: '$title' },
                        type : { $first: '$type' },
                        value : { $first: '$value' },
                        status : { $first: '$status' },
                        expiry_date : { $first: '$expiry_date' },
                        createdAt : { $first: '$createdAt' }
                    }
                },
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
    },

    delete: async (id) => {
        try {
            let promo_code = await Promocode.findById(id);
            if (promo_code) {
                let promocodeDelete = await Promocode.deleteOne({ _id: id }).exec();
                if (!promocodeDelete) {
                    return null;
                }
                return promo_code;
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = promocodeRepository;