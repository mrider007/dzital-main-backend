const mongoose = require('mongoose');
const Product = require('../models/product.model');
const ProductDetails = require('../models/product_detail.model');

const productRepository = {

    allProducts: async (req) => {
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

            if (_.isObject(req.body) && _.has(req.body, 'userId')) {
                and_clauses.push({ "userId": new mongoose.Types.ObjectId(req.body.userId) });
            }

            if (_.isObject(req.body) && _.has(req.body, 'status')) {
                and_clauses.push({ 'status': req.body.status });
            }

            if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
                and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
            }

            conditions['$and'] = and_clauses;

            let products = Product.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        let: { user_id: '$userId' },
                        from: "users",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$_id", "$$user_id"] }] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    name: { $first: "$name" },
                                    email: { $first: '$email' },
                                    image: { $first: '$image' },
                                    mobile: { $first: '$mobile' }
                                }
                            }
                        ],
                        as: "user_details"
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        let: { category: '$category_id' },
                        from: "service_categories",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$_id", "$$category"] }] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    title: { $first: "$title" }
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
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        userId: { $first: '$userId' },
                        adminId: { $first: '$adminId' },
                        status: { $first: '$status' },
                        category_id: { $first: '$category_id' },
                        user_name: { $first: '$user_details.name' },
                        cstegory_name: { $first: '$category_details.title' }
                    }
                },
                { $sort: { _id: -1 } }
            ]);
            if (!products) {
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

            let allProducts = await Product.aggregatePaginate(products, options);
            return allProducts;
        } catch (e) {
            throw e;
        }
    },

    productList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let products = ProductDetails.aggregate([
                { $match: conditions },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        price: { $first: '$price' },
                        product_type: { $first: '$product_type' },
                        photo: { $first: '$photo' },
                        image_1: { $first: '$image_1' },
                        image_2: { $first: '$image_2' },
                        image_3: { $first: '$image_3' },
                        brand: { $first: '$brand' },
                        category_id: { $first: '$category_id' },
                        quantity: { $first: '$quantity' }
                    }
                },
                { $sort: { _id: -1 } }
            ]);
            if (!products) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allProducts = await ProductDetails.aggregatePaginate(products, options);
            return allProducts;
        } catch (e) {
            throw e;
        }
    },

    updateById: async (data, id) => {
        try {
            let productUpdate = await ProductDetails.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!productUpdate) {
                return null;
            }
            return productUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let product = await Product.findById(id);
            if (product) {
                let productDelete = await Product.deleteOne({ _id: id }).exec();
                if (!productDelete) {
                    return null;
                }
                return product;
            }
        } catch (e) {
            throw e;
        }
    },

    deleteProduct: async (id) => {
        try {
            let product = await Product.findById(id);
            if (product) {
                let productDelete = await Product.deleteOne({ _id: id }).exec();
                if (!productDelete) {
                    return null;
                }
                return product;
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = productRepository;