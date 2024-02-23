const Attribute = require('../models/attribute.model');
const mongoose = require('mongoose');

const attributeRepository = {

    getAttributes: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'attribute': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
                and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
            }

            if (_.isObject(req.body) && _.has(req.body, 'sub_category_id')) {
                and_clauses.push({ 'sub_category_id': new mongoose.Types.ObjectId(req.body.sub_category_id) });
            }

            conditions['$and'] = and_clauses;

            let attributes = Attribute.aggregate([
                {
                    $lookup: {
                        let: { categoryId: '$category_id' },
                        from: "service_categories",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$_id", "$$categoryId"] }] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "category_details"
                    }
                },
                { $unwind: { path: '$category_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        let: { subcategoryId: '$sub_category_id' },
                        from: "service_categories",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$_id", "$$subcategoryId"] }] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "sub_category_details"
                    }
                },
                { $unwind: { path: '$sub_category_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        category_id: { $first: '$category_id' },
                        sub_category_id: { $first: '$sub_category_id' },
                        category_name: { $first: '$category_details.title' },
                        sub_category_name: { $first: '$sub_category_details.title' },
                        attribute: { $first: '$attribute' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' }
                    }
                },
                { $match: conditions }
            ]);
            if (!attributes) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allAttributes = await Attribute.aggregatePaginate(attributes, options);
            return allAttributes;
        } catch (e) {
            throw e;
        }
    },

    getAttributeDetails: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ _id: new mongoose.Types.ObjectId(req.params.id) });

            conditions['$and'] = and_clauses;

            let attribute = await Attribute.aggregate([
                {
                    $lookup: {
                        let: { categoryId: '$category_id' },
                        from: "service_categories",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$_id", "$$categoryId"] }] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "category_details"
                    }
                },
                { $unwind: { path: '$category_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        let: { subcategoryId: '$sub_category_id' },
                        from: "service_categories",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$_id", "$$subcategoryId"] }] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "sub_category_details"
                    }
                },
                { $unwind: { path: '$sub_category_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        category_id: { $first: '$category_id' },
                        sub_category_id: { $first: '$sub_category_id' },
                        category_name: { $first: '$category_details.title' },
                        sub_category_name: { $first: '$sub_category_details.title' },
                        attribute: { $first: '$attribute' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' }
                    }
                },
                { $match: conditions }
            ]);
            if (!attribute) {
                return null;
            }
            return attribute[0];
        } catch (e) {
            throw e;
        }
    }

}

module.exports = attributeRepository;