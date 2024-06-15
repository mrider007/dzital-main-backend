const mongoose = require('mongoose');
const ContactToSupplier = require('../models/contact_to_supplier.model');

const ContactToProviderRepository = {

    getContactToSupplierList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];
    
            and_clauses.push({ productId: new mongoose.Types.ObjectId(req.body.productId) });
    
            let key = req.body.keyword_search;
    
            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                // Check if keyword_search has length greater than 0
                if (key.length > 0) {
                    // Disable req.body.page and req.body.limit
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }
    
            conditions['$and'] = and_clauses;
    
            let enquiryList = ContactToSupplier.aggregate([
                {
                    $lookup: {
                        let: { userId: '$userId' },
                        from: "users",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$userId"] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "user_details"
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        userId: { $first: '$userId' },
                        productId: { $first: '$productId' },
                        sellerId: { $first: '$sellerId' },
                        quantity: { $first: '$quantity' },
                        requirements_details: { $first: '$requirements_details' },
                        user_name: { $first: '$user_details.name' },
                        user_image: { $first: '$user_details.image' },
                        user_mobile: { $first: '$user_details.mobile' },
                        user_address: { $first: '$user_details.address' },
                        createdAt: { $first: '$createdAt' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
    
            if (!enquiryList) {
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
    
            let productEnqueries = await ContactToSupplier.aggregatePaginate(enquiryList, options);
            return productEnqueries;
        } catch (e) {
            throw e;
        }
    },    

    getUserOwnContactToSupplierList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ 'userId': req.user._id });

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {

                // Check if keyword_search has length greater than 0
                if (key.length > 0) {
                    // Disable req.body.page and req.body.limit
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }

            conditions['$and'] = and_clauses;

            let enquiryList = ContactToSupplier.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!enquiryList) {
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
            let productEnqueries = await ContactToSupplier.aggregatePaginate(enquiryList, options);
            return productEnqueries;
        } catch (e) {
            throw e;
        }
    }

};

module.exports = ContactToProviderRepository;