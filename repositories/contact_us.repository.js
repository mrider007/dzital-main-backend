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

                and_clauses.push({
                    $or: [
                        { 'name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'email': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
                
                if (key.length > 0) {
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