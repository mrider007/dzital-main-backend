const mongoose = require('mongoose');
const ProductElectronics = require('../models/product_electronics.model');

const productElectronicsRepository = {

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

            if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
                and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
            }

            conditions['$and'] = and_clauses;

            let products = ProductElectronics.aggregate([
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
                        status: { $first: '$product_details.status' },
                        price: { $first: '$price' },
                        product_type: { $first: '$product_type' },
                        photo: { $first: '$photo' },
                        image_1: { $first: '$image_1' },
                        image_2: { $first: '$image_2' },
                        image_3: { $first: '$image_3' },
                        brand: { $first: '$brand' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
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
            let allProducts = await ProductElectronics.aggregatePaginate(products, options);
            return allProducts;
        } catch (e) {
            throw e;
        }
    },

    updateById: async (data, id) => {
        try {
            let electronicsUpdate = await ProductElectronics.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!electronicsUpdate) {
                return null;
            }
            return electronicsUpdate;
        } catch (e) {
            throw e;
        }
    },

    getDetails: async (params) => {
        try {
            let product = await ProductElectronics.aggregate([
                { $match: params },
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
                        price: { $first: '$price' },
                        product_type: { $first: '$product_type' },
                        photo: { $first: '$photo' },
                        image_1: { $first: '$image_1' },
                        image_2: { $first: '$image_2' },
                        image_3: { $first: '$image_3' },
                        brand: { $first: '$brand' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
                        quantity: { $first: '$quantity' },
                        status: { $first: '$product_details.status' },
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

delete: async (id) => {
    try {
        let electronics = await ProductElectronics.findById(id);
        if (electronics) {
            let electronicsDelete = await ProductElectronics.deleteOne({ _id: id }).exec();
            if (!electronicsDelete) {
                return null;
            }
            return electronics;
        }
    } catch (e) {
        throw e;
    }
}
}

module.exports = productElectronicsRepository;