const FAQ = require('../models/faq.model');

const FAQRepository = {

    updateById: async (data, id) => {
        try {
            let faqUpdate = await FAQ.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!faqUpdate) {
                return null;
            }
            return faqUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let faq = await FAQ.findById(id);
            if (!_.isEmpty(faq) && faq._id) {
                let faqDelete = await FAQ.deleteOne({ _id: id }).exec();
                if (!faqDelete) {
                    return null;
                }
                return faq;
            }
        } catch (e) {
            throw e;
        }
    },

    getFaqList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'question': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'answer': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });

                // Check if keyword_search has length greater than 0
                if (key.length > 0) {
                    // Disable req.body.page and req.body.limit
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }

            conditions['$and'] = and_clauses;

            let faqlist = FAQ.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!faqlist) {
                return null;
            }

            var options = {};
            if (req.body.page !== undefined) {
                options.page = req.body.page;
            }
            if (req.body.limit !== undefined) {
                options.limit = req.body.limit;
            }
            let allFaq = await FAQ.aggregatePaginate(faqlist, options);
            return allFaq;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = FAQRepository;