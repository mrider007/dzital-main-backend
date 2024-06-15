const ContactToSupplier = require('../models/contact_to_supplier.model');

const ContactToProviderRepository = {

    getContactToSupplierList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ 'sellerId': req.user._id });

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                // and_clauses.push({
                //     $or: [
                //         //{ 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                //     ]
                // });

                // Check if keyword_search has length greater than 0
                if (key.length > 0) {
                    // Disable req.body.page and req.body.limit
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }

            // if (_.isObject(req.body) && _.has(req.body, 'status')) {
            //     if (req.body.status !== 'All') {
            //         and_clauses.push({ 'status': req.body.status });
            //     }
            // }

            //console.log('and', and_clauses);

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