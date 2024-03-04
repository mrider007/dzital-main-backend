const mongoose = require('mongoose');
const Property = require('../models/product_real_estate.model');

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
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ status: 'Approved' });

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

            if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
                and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
            }

            conditions['$and'] = and_clauses;

            let property = Property.aggregate([
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
                        let: { productId: '$product_id' },
                        from: "attribute_values",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$product_id", "$$productId"] }] },
                                        ]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    let: { attributeId: '$attribute_id' },
                                    from: "attributes",
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $or: [{ $eq: ["$_id", "$$attributeId"] }] },
                                                    ]
                                                }
                                            }
                                        }

                                    ],
                                    as: "attribute_details"
                                }
                            },
                            { $unwind: { path: '$attribute_details', preserveNullAndEmptyArrays: true } },
                            {
                                $group: {
                                    _id: '$_id',
                                    product_id: { $first: '$product_id' },
                                    attribute_id: { $first: '$attribute_id' },
                                    attribute: { $first: '$attribute_details.attribute' },
                                    value: { $first: '$value' },
                                    createdAt: { $first: '$createdAt' },
                                    updatedAt: { $first: '$updatedAt' }
                                }
                            }
                        ],
                        as: "attribute_value_details"
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        status: { $first: '$product_details.status' },
                        photo: { $first: '$photo' },
                        image_1: { $first: '$image_1' },
                        image_2: { $first: '$image_2' },
                        image_3: { $first: '$image_3' },
                        user_id: { $first: '$user_id' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
                        category_name: { $first: '$category_details.title' },
                        attribute_values: { $first: '$attribute_value_details' }
                    }
                },
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

            let allProperties = await Property.aggregatePaginate(property, options);
            return allProperties;
        } catch (e) {
            throw e;
        }
    },

    getRealEstateDetails: async (params) => {
        try {
            let property = await Property.aggregate([
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
                        let: { productId: '$product_id' },
                        from: "attribute_values",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$product_id", "$$productId"] }] },
                                        ]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    let: { attributeId: '$attribute_id' },
                                    from: "attributes",
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $or: [{ $eq: ["$_id", "$$attributeId"] }] },
                                                    ]
                                                }
                                            }
                                        }

                                    ],
                                    as: "attribute_details"
                                }
                            },
                            { $unwind: { path: '$attribute_details', preserveNullAndEmptyArrays: true } },
                            {
                                $group: {
                                    _id: '$_id',
                                    product_id: { $first: '$product_id' },
                                    attribute_id: { $first: '$attribute_id' },
                                    attribute: { $first: '$attribute_details.attribute' },
                                    value: { $first: '$value' },
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
                        status: { $first: '$product_details.status' },
                        photo: { $first: '$photo' },
                        image_1: { $first: '$image_1' },
                        image_2: { $first: '$image_2' },
                        image_3: { $first: '$image_3' },
                        user_id: { $first: '$user_id' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
                        category_name: { $first: '$category_details.title' },
                        attribute_values: { $first: '$attribute_value_details' }
                    }
                }
            ]);
            if (!property) {
                return null;
            }
            return property[0];
        } catch (e) {
            throw e;
        }
    }

}

module.exports = propertyRepository;