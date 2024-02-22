const mongoose = require('mongoose');
const ProductEducation = require('../models/product_education.model');

const productEducationRepository = {

    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ status: 'Approved' });

            if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
                and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
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
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        status: { $first: '$product_details.status' },
                        image: { $first: '$image' },
                        product_id: { $first: '$product_id' },
                        category_id: { $first: '$category_id' },
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

    getDetails: async (params) => {
        try {
            let product = await ProductEducation.aggregate([
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
                        image: { $first: '$image' },
                        address: { $first: '$address' },
                        category_id: { $first: '$category_id' },
                        status: { $first: '$product_details.status' },
                        product_id: { $first: '$product_id' },
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