const mongoose = require('mongoose');
const Freelancer = require('../models/product_freelancer.model');

const freelancerRepository = {

    getDetails: async (params) => {
        try {
            let products = await Freelancer.aggregate([
                { $match: params },
                {
                    $lookup: {
                        from: 'service_categories',
                        localField: 'category_id',
                        foreignField: '_id',
                        as: 'category_details'
                    }
                },
                { $unwind: { path: '$category_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user_details'
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'product_details'
                    }
                },
                { $unwind: { path: '$product_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        let: { subcategoryId: '$sub_category_id' },
                        from: "attributes",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$sub_category_id", "$$subcategoryId"] }] },
                                        ]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    let: { attributeId: '$_id' },
                                    from: "attribute_values",
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $or: [{ $eq: ["$attribute_id", "$$attributeId"] }] },
                                                    ]
                                                }
                                            }
                                        }

                                    ],
                                    as: "attribute_values"
                                }
                            },
                            { $unwind: { path: '$attribute_values', preserveNullAndEmptyArrays: true } },
                            {
                                $group: {
                                    _id: '$_id',
                                    //product_id: { $first: '$product_id' },
                                    attribute_id: { $first: '$_id' },
                                    attribute: { $first: '$attribute' },
                                    value: { $first: '$attribute_values.value' },
                                    createdAt: { $first: '$createdAt' },
                                    updatedAt: { $first: '$updatedAt' }
                                }
                            },
                            { $sort: { _id: 1 } }
                        ],
                        as: "attribute_value_details"
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        image: { $first: '$image' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
                        category_name: { $first: '$category_details.title' },
                        bid_now: { $first: '$product_details.bid_now' },
                        bid_start_price: { $first: '$product_details.bid_start_price' },
                        bid_increament_value: { $first: '$product_details.bid_increament_value' },
                        bid_entry: { $first: '$product_details.bid_entry' },
                        bid_start_date: { $first: '$product_details.bid_start_date' },
                        bid_end_date: { $first: '$product_details.bid_end_date' },
                        status: { $first: '$product_details.status' },
                        attribute_values: { $first: '$attribute_value_details' },
                        createdAt: { $first: '$createdAt' }
                    }
                }
            ]);
            if (!products) {
                return null;
            }
            return products[0];
        } catch (e) {
            throw e;
        }
    },

    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
                and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
            }

            conditions['$and'] = and_clauses;

            let products = Freelancer.aggregate([
                {
                    $lookup: {
                        from: 'service_categories',
                        localField: 'category_id',
                        foreignField: '_id',
                        as: 'category_details'
                    }
                },
                { $unwind: { path: '$category_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'product_details'
                    }
                },
                { $unwind: { path: '$product_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        experience: { $first: '$experience' },
                        skills: { $first: '$skills' },
                        image: { $first: '$image' },
                        location: { $first: '$location' },
                        budget: { $first: '$budget' },
                        status: { $first: '$product_details.status' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
                        category_name: { $first: '$category_details.title' },
                        createdAt: { $first: '$createdAt' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);

            if (!products) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allProducts = await Freelancer.aggregatePaginate(products, options);
            return allProducts;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let freelancer = await Freelancer.findById(id);
            if (freelancer) {
                let freelancerDelete = await Freelancer.deleteOne({ _id: id }).exec();
                if (!freelancerDelete) {
                    return null;
                }
                return freelancer;
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = freelancerRepository;