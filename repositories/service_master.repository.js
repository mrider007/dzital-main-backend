const Service = require('../models/service_master.model');
const mongoose = require('mongoose');

const serviceRepository = {

    updateById: async (data, id) => {
        try {
            let serviceUpdate = await Service.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!serviceUpdate) {
                return null;
            }
            return serviceUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let service = await Service.findById(id);
            if (service) {
                let serviceDelete = await Service.deleteOne({ _id: id }).exec();
                if (!serviceDelete) {
                    return null;
                }
                return service;
            }
        } catch (e) {
            throw e;
        }
    },

    getCategories: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ parentId: null });

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let services = Service.aggregate([
                {
                    $lookup: {
                        let: { category_id: '$_id' },
                        from: "service_categories",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$parentId", "$$category_id"] }] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "sub_category_details"
                    }
                },
                {
                    $addFields: {
                        total_sub_categories: { $size: "$sub_category_details" },
                    }
                },
                {
                    $lookup: {
                        let: { categoryId: '$_id' },
                        from: "attributes",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$category_id", "$$categoryId"] }] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "attribute_details"
                    }
                },
                {
                    $addFields: {
                        total_attributes: { $size: "$attribute_details" },
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        parentId: { $first: '$parentId' },
                        total_sub_categories: { $first: '$total_sub_categories' },
                        total_attributes: { $first: '$total_attributes' },
                        createdAt: { $first: '$createdAt' },
                    }
                },
                { $match: conditions },
                { $sort: { _id: 1 } }
            ]);
            if (!services) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allServices = await Service.aggregatePaginate(services, options);
            return allServices;
        } catch (e) {
            throw e;
        }
    },

    getSubCategories: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ parentId: new mongoose.Types.ObjectId(req.body.parentId) });

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let services = Service.aggregate([
                { $match: conditions }
            ]);
            if (!services) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allServices = await Service.aggregatePaginate(services, options);
            return allServices;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = serviceRepository;