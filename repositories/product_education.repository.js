const mongoose = require('mongoose');
const ProductEducation = require('../models/product_education.model');

const productEducationRepository = {

    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ status: 'Approved' });

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            // Filter based on in attribute & its value
            let filter = req.body.filter;

            if (filter && _.isArray(filter)) {
                filter.forEach((item) => {
                    if (!!item && _.isObject(item) && _.has(item, 'attribute') && _.has(item, 'value') && _.isArray(item.value) && item.value.length > 0) {
                        and_clauses.push(
                            {
                                'attribute_values': {
                                    $elemMatch: {
                                        attribute: item.attribute,
                                        value: { $in: item.value }
                                    }
                                }
                            }
                        );
                    }
                })
            }

            if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
                and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
            }

            if (_.isObject(req.body) && _.has(req.body, 'sub_category_id') && req.body.sub_category_id !== '') {
                and_clauses.push({ 'sub_category_id': new mongoose.Types.ObjectId(req.body.sub_category_id) });
            }

            conditions['$and'] = and_clauses;

            let products = ProductEducation.aggregate([
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
                        isWishlist: { $first: '$isWishlist' },
                        image: { $first: '$image' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
                        sub_category_id: { $first: "$sub_category_id" },
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
            let allProducts = await ProductEducation.aggregatePaginate(products, options);
            return allProducts;
        } catch (e) {
            throw e;
        }
    },

    getAll: async (req, userId) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ status: 'Approved' });

            // Filter based on in attribute & its value
            let filter = req.body.filter;

            if (filter && _.isArray(filter)) {
                filter.forEach((item) => {
                    if (!!item && _.isObject(item) && _.has(item, 'attribute') && _.has(item, 'value') && _.isArray(item.value) && item.value.length > 0) {
                        and_clauses.push(
                            {
                                'attribute_values': {
                                    $elemMatch: {
                                        attribute: item.attribute,
                                        value: { $in: item.value }
                                    }
                                }
                            }
                        );
                    }
                })
            }

            if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
                and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
            }

            if (_.isObject(req.body) && _.has(req.body, 'sub_category_id') && req.body.sub_category_id !== '') {
                and_clauses.push({ 'sub_category_id': new mongoose.Types.ObjectId(req.body.sub_category_id) });
            }

            conditions['$and'] = and_clauses;

            let products = ProductEducation.aggregate([
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
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        status: { $first: '$product_details.status' },
                        image: { $first: '$image' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
                        sub_category_id: { $first: "$sub_category_id" },
                        createdAt: { $first: '$createdAt' },
                        //wishlists: { $addToSet: '$wishlists' },
                        isWishlist: { $first: '$isWishlist' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);

            if (!products) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allProducts = await ProductEducation.aggregatePaginate(products, options);
            return allProducts;
        } catch (e) {
            throw e;
        }
    },

    getDetails: async (params, userId) => {
        try {
            let product = await ProductEducation.aggregate([
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
                        image: { $first: '$image' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
                        sub_category_id: { $first: '$sub_category_id' },
                        category_name: { $first: '$category_details.title' },
                        sub_category_name: { $first: '$sub_category_details.title' },
                        bid_now: { $first: '$product_details.bid_now' },
                        bid_start_price: { $first: '$product_details.bid_start_price' },
                        bid_increament_value: { $first: '$product_details.bid_increament_value' },
                        bid_entry: { $first: '$product_details.bid_entry' },
                        bid_start_date: { $first: '$product_details.bid_start_date' },
                        bid_end_date: { $first: '$product_details.bid_end_date' },
                        //wishlists: { $addToSet: '$wishlists' },
                        isWishlist: { $first: '$isWishlist' },
                        status: { $first: '$product_details.status' },
                        attributes: { $first: '$attribute_details' },
                        attribute_values: { $first: '$attribute_value_details' },
                        createdAt: { $first: '$createdAt' }
                    }
                }
            ]);
            if (!product) {
                return null;
            }
            return product[0];
        } catch (e) {
            throw e;
        }
    },

    updateById: async (data, id) => {
        try {
            let lessoncourseUpdate = await ProductEducation.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!lessoncourseUpdate) {
                return null;
            }
            return lessoncourseUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let lesson_course = await ProductEducation.findById(id);
            if (lesson_course) {
                let lessoncourseDelete = await ProductEducation.deleteOne({ _id: id }).exec();
                if (!lessoncourseDelete) {
                    return null;
                }
                return lesson_course;
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = productEducationRepository;