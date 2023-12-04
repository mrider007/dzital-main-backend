const mongoose = require('mongoose');
const Property = require('../models/property.model');

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

        if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
            and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
        }

        conditions['$and'] = and_clauses;

        let property = Property.aggregate([
            { $match: conditions },
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
                $group: {
                    _id: '$_id',
                    title: { $first: '$title' },
                    description: { $first: '$description' },
                    per_sqmt_price: { $first: '$per_sqmt_price' },
                    size: { $first: '$size' },
                    rent_per_month: { $first: '$rent_per_month' },
                    floor: { $first: '$floor' },
                    rooms: { $first: '$rooms' },
                    bathrooms: { $first: '$bathrooms' },
                    bedrooms: { $first: '$bedrooms' },
                    balcony: { $first: '$balcony' },
                    terrace: { $first: '$terrace' },
                    property_type: { $first: '$property_type' },
                    parking_type: { $first: '$parking_type' },
                    parking_fee: { $first: '$parking_fee' },
                    parking_slots: { $first: '$parking_slots' },
                    year_built: { $first: '$year_built' },
                    user_id: { $first: '$user_id' },
                    category_id: { $first: '$category_id' },
                    user_name: { $first: '$user_details.name' },
                    category_name: { $first: '$category_details.title' }
                }
            },
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
    }

}

module.exports = propertyRepository;