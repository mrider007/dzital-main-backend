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
                    $lookup: {
                        let: { attributeId: '$_id' },
                        from: 'attribute_options',
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
                        as: "attribute_options"
                    }
                },
                {
                    $addFields: {
                        total_attribute_options: { $size: "$attribute_options" },
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        category_id: { $first: '$category_id' },
                        sub_category_id: { $first: '$sub_category_id' },
                        category_name: { $first: '$category_details.title' },
                        sub_category_name: { $first: '$sub_category_details.title' },
                        attribute: { $first: '$attribute' },
                        attribute_option_count: { $first: '$total_attribute_options' },
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

    getAllAttributes: async (req) => {
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

            let attributes = await Attribute.aggregate([
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
                    $lookup: {
                        let: { attributeId: '$_id' },
                        from: "attribute_options",
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
                        as: "option_details"
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        category_id: { $first: '$category_id' },
                        sub_category_id: { $first: '$sub_category_id' },
                        category_name: { $first: '$category_details.title' },
                        sub_category_name: { $first: '$sub_category_details.title' },
                        attribute: { $first: '$attribute' },
                        options: { $first: '$option_details' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: 1 } }
            ]);
            if (!attributes) {
                return null;
            }
            return attributes;
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
                    $lookup: {
                        let: { attributeId: '$_id' },
                        from: "attribute_options",
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
                        as: "option_details"
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        category_id: { $first: '$category_id' },
                        sub_category_id: { $first: '$sub_category_id' },
                        category_name: { $first: '$category_details.title' },
                        sub_category_name: { $first: '$sub_category_details.title' },
                        attribute: { $first: '$attribute' },
                        options: { $first: '$option_details' },
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
    },

    updateById: async (data, id) => {
        try {
            let attributeUpdate = await Attribute.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!attributeUpdate) {
                return null;
            }
            return attributeUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let attribute = await Attribute.findById(id);
            if (attribute) {
                let attributeDelete = await Attribute.deleteOne({ _id: id }).exec();
                if (!attributeDelete) {
                    return null;
                }
                return attribute;
            }
        } catch (e) {
            throw e;
        }
    },
    
    // product filter list
    getFilterList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            if(_.isEmpty(req.body)){
                return null;
            }

            if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
                and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
                // and_clauses.push({ 'is_master_filter': true });
            }
            if (_.isObject(req.body) && _.has(req.body, 'sub_category_id')) {
                and_clauses.push({ 'sub_category_id': new mongoose.Types.ObjectId(req.body.sub_category_id) });
                // and_clauses.push({ 'is_sub_filter': true });
            }

            conditions['$and'] = and_clauses;
            // console.log(and_clauses);
            let attributes = await Attribute.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'attribute_values',
                        pipeline:[
                            {
                                $group: {
                                    _id: '$_id',
                                    value: { $first: '$value' },
                                }
                            }
                        ],
                        localField: '_id',
                        foreignField: 'attribute_id',
                        as: 'attribute_values'
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        attribute: { $first: '$attribute' },
                        attribute_values: { $first: '$attribute_values' },
                    }
                },
                { $sort: { _id: 1 } }
            ]);
            if (!attributes) {
                return null;
            }
            return attributes;
        } catch (error) {
            throw error
        }
    }

}

module.exports = attributeRepository;