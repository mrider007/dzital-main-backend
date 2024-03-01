const AttributeOption = require('../models/attribute_option.model');
const mongoose = require('mongoose');

const attributeoptionRepository = {

    updateById: async (data, id) => {
        try {
            let attributeoptionUpdate = await AttributeOption.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!attributeoptionUpdate) {
                return null;
            }
            return attributeoptionUpdate;
        } catch (e) {
            throw e;
        }
    },

    getAttributeOptions: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'attribute': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }, 
                        { 'option': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            if (_.isObject(req.body) && _.has(req.body, 'attribute_id')) {
                and_clauses.push({ 'attribute_id': new mongoose.Types.ObjectId(req.body.attribute_id) });
            }

            conditions['$and'] = and_clauses;

            let attribute_options = AttributeOption.aggregate([
                {
                    $lookup: {
                        let: { attributeId: '$attribute_id' },
                        from: 'attributes',
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
                        attribute_id: { $first: '$attribute_id' },
                        attribute: { $first: '$attribute_details.attribute' },
                        option: { $first: '$option' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: 1 } }
            ]);
            if (!attribute_options) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allAttributeOptions = await AttributeOption.aggregatePaginate(attribute_options, options);
            return allAttributeOptions;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let attribute_option = await AttributeOption.findById(id);
            if (attribute_option) {
                let attributeoptionDelete = await AttributeOption.deleteOne({ _id: id }).exec();
                if (!attributeoptionDelete) {
                    return null;
                }
                return attribute_option;
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = attributeoptionRepository;