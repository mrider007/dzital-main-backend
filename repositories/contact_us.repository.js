const mongoose = require('mongoose');
const ContactUs = require('../models/contact_us.model');

const ContactUsRepository = {

    List: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'email': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let contactusList = ContactUs.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!contactusList) {
                return null;
            }

            let options = { page: 1, limit: 10 };

            if (!_.isEmpty(req.body.keyword_search)) {
                options.page = 1;
                options.limit = 10;
            } else {
                options.page = req.body.page || 1;
                options.limit = req.body.limit || 10;
            }
            let contactusData = await ContactUs.aggregatePaginate(contactusList, options);
            return contactusData;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = ContactUsRepository;