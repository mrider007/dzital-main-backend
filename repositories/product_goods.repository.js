const mongoose = require('mongoose');
const ProductGoods = require('../models/product_goods.model');

const goodsRepository = {

    List: async (req) => {
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
            // Filter based on sub category
            let sub_category_id = req.body.sub_category_id

            if (sub_category_id) {
                and_clauses.push({ 'sub_category_id': new mongoose.Types.ObjectId(sub_category_id) });
            }
            //   console.log(and_clauses)

            if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
                and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
            }

            conditions['$and'] = and_clauses;

            let products = ProductGoods.aggregate([
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
                                    attribute: { $first: '$attribute.attribute' },
                                    value: { $first: '$value' },
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
                        price: { $first: '$price' },
                        product_type: { $first: '$product_type' },
                        attribute_values: { $first: '$attribute_value_details' },
                        photo: { $first: '$photo' },
                        image_1: { $first: '$image_1' },
                        image_2: { $first: '$image_2' },
                        image_3: { $first: '$image_3' },
                        brand: { $first: '$brand' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
                        sub_category_id: { $first: "$sub_category_id" },
                        quantity: { $first: '$quantity' },
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
            let allGoods = await ProductGoods.aggregatePaginate(products, options);
            return allGoods;
        } catch (e) {
            throw e;
        }
    },

    getDetails: async (params) => {
        try {
            let product = await ProductGoods.aggregate([
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
                                            { $or: [{ $eq: ["$product_id", "$$productId"] }] },
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
            let productGoodsUpdate = await ProductGoods.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!productGoodsUpdate) {
                return null;
            }
            return productGoodsUpdate;
        } catch (e) {
            return e;
        }
    },

    delete: async (id) => {
        try {
            let goods = await ProductGoods.findById(id);
            if (goods) {
                let goodsDelete = await ProductGoods.deleteOne({ _id: id }).exec();
                if (!goodsDelete) {
                    return null;
                }
                return goods;
            }
        } catch (e) {
            throw e;
        }
    }
}

module.exports = goodsRepository;