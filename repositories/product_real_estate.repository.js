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

    /** Admin Product Real Estate Details */
    getPropertyDetails: async (params, userId) => {
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
                        from: 'service_categories',
                        localField: 'sub_category_id',
                        foreignField: '_id',
                        as: 'sub_category_details'
                    }
                },
                { $unwind: { path: '$sub_category_details', preserveNullAndEmptyArrays: true } },
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
                        from: "product_wishlists",
                        let: { productId: "$product_id", user_id: userId },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $in: ["$$productId", "$products.product_id"] },
                                            { $eq: ["$user_id", "$$user_id"] }
                                        ],
                                    },
                                },
                            },
                        ],
                        as: "wishlists",
                    },
                },
                { $unwind: { path: '$wishlists', preserveNullAndEmptyArrays: true } },
                {
                    $addFields: {
                        'isWishlist': {
                            $cond: {
                                if: { $eq: [userId, null] }, then: false,
                                else: {
                                    $cond: {
                                        if: { $eq: ['$wishlists.user_id', userId] },
                                        then: true,
                                        else: false
                                    }
                                },
                            }
                        },
                    }
                },
                {
                    $lookup: {
                        let: { subcategoryId: '$sub_category_id' },
                        from: "attributes",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$sub_category_id", "$$subcategoryId"] },
                                        ]
                                    }
                                }
                            },
                            { $sort: { _id: 1 } }
                        ],
                        as: "attribute_details"
                    }
                },
                {
                    $lookup: {
                        let: { productId: '$product_id' },
                        from: "attribute_values",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$product_id", "$$productId"] },
                                        ]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    from: "attributes",
                                    localField: 'attribute_id',
                                    foreignField: '_id',
                                    as: "attribute"
                                }
                            },
                            { $unwind: { path: '$attribute', preserveNullAndEmptyArrays: true } },
                            {
                                $group: {
                                    _id: '$_id',
                                    product_id: { $first: '$product_id' },
                                    attribute_id: { $first: '$attribute_id' },
                                    attribute: { $first: '$attribute.attribute' },
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
                        photo: { $first: '$photo' },
                        image_1: { $first: '$image_1' },
                        image_2: { $first: '$image_2' },
                        image_3: { $first: '$image_3' },
                        lat: { $first: '$lat' },
                        lng: { $first: '$lng' },
                        address: { $first: '$address' },
                        bid_now: { $first: '$product_details.bid_now' },
                        bid_start_price: { $first: '$product_details.bid_start_price' },
                        bid_increament_value: { $first: '$product_details.bid_increament_value' },
                        bid_entry: { $first: '$product_details.bid_entry' },
                        bid_start_date: { $first: '$product_details.bid_start_date' },
                        bid_end_date: { $first: '$product_details.bid_end_date' },
                        //wishlists: { $addToSet: '$wishlists' },
                        isWishlist: { $first: '$isWishlist' },
                        status: { $first: '$product_details.status' },
                        userId: { $first: '$product_details.userId' },
                        user_id: { $first: '$user_id' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
                        category_name: { $first: '$category_details.title' },
                        sub_category_id: { $first: '$sub_category_id' },
                        sub_category_name: { $first: '$sub_category_details.title' },
                        attributes: { $first: '$attribute_details' },
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

            // Filter based on in attribute & its value
            let filter = req.body.filter;

            if (filter && _.isArray(filter)) {
                filter.forEach((item) => {
                    if (!!item && _.isObject(item) && _.has(item, 'attribute') && _.has(item, 'value')) {
                        and_clauses.push(
                            {
                                'attribute_values': {
                                    $elemMatch: item
                                }
                            }
                        );
                    }
                })
            }

            if (_.isObject(req.body) && _.has(req.body, 'sub_category_id') && req.body.sub_category_id !== '') {
                and_clauses.push({ 'sub_category_id': new mongoose.Types.ObjectId(req.body.sub_category_id) });
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
                                            { $eq: ["$product_id", "$$productId"] },
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
                                                        { $eq: ["$_id", "$$attributeId"] },
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
                    $addFields: {
                        'isWishlist': false
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        status: { $first: '$product_details.status' },
                        bid_now: { $first: '$product_details.bid_now' },
                        userId: { $first: '$product_details.userId' },
                        photo: { $first: '$photo' },
                        image_1: { $first: '$image_1' },
                        image_2: { $first: '$image_2' },
                        image_3: { $first: '$image_3' },
                        user_id: { $first: '$user_id' },
                        product_id: { $first: '$product_id' },
                        isWishlist: { $first: '$isWishlist' },
                        sub_category_id: { $first: "$sub_category_id" },
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

    getAll: async (req, userId) => {
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

            // Filter based on in attribute & its value
            let filter = req.body.filter;

            if (filter && _.isArray(filter)) {
                filter.forEach((item) => {
                    if (!!item && _.isObject(item) && _.has(item, 'attribute') && _.has(item, 'value')) {
                        and_clauses.push(
                            {
                                'attribute_values': {
                                    $elemMatch: item
                                }
                            }
                        );
                    }
                })
            }

            if (_.isObject(req.body) && _.has(req.body, 'sub_category_id') && req.body.sub_category_id !== '') {
                and_clauses.push({ 'sub_category_id': new mongoose.Types.ObjectId(req.body.sub_category_id) });
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
                        from: "product_wishlists",
                        let: { productId: "$product_id", user_id: userId },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $in: ["$$productId", "$products.product_id"] },
                                            { $eq: ["$user_id", "$$user_id"] }
                                        ],
                                    },
                                },
                            },
                        ],
                        as: "wishlists",
                    },
                },
                { $unwind: { path: '$wishlists', preserveNullAndEmptyArrays: true } },
                {
                    $addFields: {
                        'isWishlist': {
                            $cond: {
                                if: { $eq: [userId, null] }, then: false,
                                else: {
                                    $cond: {
                                        if: { $eq: ['$wishlists.user_id', userId] },
                                        then: true,
                                        else: false
                                    }
                                },
                            }
                        },
                    }
                },
                {
                    $lookup: {
                        let: { productId: '$product_id' },
                        from: "attribute_values",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$product_id", "$$productId"] },
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
                                                        { $eq: ["$_id", "$$attributeId"] },
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
                        bid_now: { $first: '$product_details.bid_now' },
                        userId: { $first: '$product_details.userId' },
                        photo: { $first: '$photo' },
                        image_1: { $first: '$image_1' },
                        image_2: { $first: '$image_2' },
                        image_3: { $first: '$image_3' },
                        user_id: { $first: '$user_id' },
                        //wishlists: { $addToSet: '$wishlists' },
                        isWishlist: { $first: '$isWishlist' },
                        product_id: { $first: '$product_id' },
                        sub_category_id: { $first: "$sub_category_id" },
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

    getRealEstateDetails: async (params, userId) => {
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
                        from: 'service_categories',
                        localField: 'sub_category_id',
                        foreignField: '_id',
                        as: 'sub_category_details'
                    }
                },
                { $unwind: { path: '$sub_category_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "users",
                        let: { userID: "$user_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$userID"] }
                                        ],
                                    },
                                },
                            },
                            {
                                $project: {
                                    _id: 1,
                                    name: 1,
                                    image: 1,
                                    email: 1,
                                    mobile: 1,
                                    address: 1
                                }
                            }
                        ],
                        as: "seller_details",
                    },
                },
                { $unwind: { path: '$seller_details', preserveNullAndEmptyArrays: true } },

                // {
                //     $lookup: {
                //         from: 'users',
                //         localField: 'user_id',
                //         foreignField: '_id',
                //         as: 'user_details'
                //     }
                // },
                // { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },

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
                        from: "product_wishlists",
                        let: { productId: "$product_id", user_id: userId },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $in: ["$$productId", "$products.product_id"] },
                                            { $eq: ["$user_id", "$$user_id"] }
                                        ],
                                    },
                                },
                            },
                        ],
                        as: "wishlists",
                    },
                },
                { $unwind: { path: '$wishlists', preserveNullAndEmptyArrays: true } },
                {
                    $addFields: {
                        'isWishlist': {
                            $cond: {
                                if: { $eq: [userId, null] }, then: false,
                                else: {
                                    $cond: {
                                        if: { $eq: ['$wishlists.user_id', userId] },
                                        then: true,
                                        else: false
                                    }
                                },
                            }
                        },
                    }
                },
                {
                    $lookup: {
                        let: { subcategoryId: '$sub_category_id' },
                        from: "attributes",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$sub_category_id", "$$subcategoryId"] },
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
                                                        { $eq: ["$attribute_id", "$$attributeId"] },
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
                        status: { $first: '$product_details.status' },
                        bid_now: { $first: '$product_details.bid_now' },
                        bid_start_price: { $first: '$product_details.bid_start_price' },
                        bid_increament_value: { $first: '$product_details.bid_increament_value' },
                        userId: { $first: '$product_details.userId' },
                        seller_details: { $first: '$seller_details' },
                        bid_entry: { $first: '$product_details.bid_entry' },
                        bid_start_date: { $first: '$product_details.bid_start_date' },
                        bid_end_date: { $first: '$product_details.bid_end_date' },
                        //wishlists: { $addToSet: '$wishlists' },
                        isWishlist: { $first: '$isWishlist' },
                        photo: { $first: '$photo' },
                        image_1: { $first: '$image_1' },
                        image_2: { $first: '$image_2' },
                        image_3: { $first: '$image_3' },
                        lat: { $first: '$lat' },
                        lng: { $first: '$lng' },
                        address: { $first: '$address' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
                        category_name: { $first: '$category_details.title' },
                        category_slug: { $first: '$category_details.slug' },
                        sub_category_id: { $first: '$sub_category_id' },
                        sub_category_name: { $first: '$sub_category_details.title' },
                        attribute_values: { $first: '$attribute_value_details' },
                        createdAt: { $first: '$createdAt' }
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
    },

    delete: async (id) => {
        try {
            let property = await Property.findById(id);
            if (property) {
                let propertyDelete = await Property.deleteOne({ _id: id }).exec();
                if (!propertyDelete) {
                    return null;
                }
                return property;
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = propertyRepository;