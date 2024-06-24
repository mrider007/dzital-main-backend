const mongoose = require('mongoose');
const ContactUs = require('../models/contact_us.model');

const ContactUsRepository = {

    List: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

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

            let contactusList = ContactUs.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!contactusList) {
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
            let contactusData = await ContactUs.aggregatePaginate(contactusList, options);
            return contactusData;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = ContactUsRepository;