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

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'question': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'answer': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let faqlist = FAQ.aggregate([
                { $match: conditions }
            ]);
            if (!faqlist) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allFaq = await FAQ.aggregatePaginate(faqlist, options);
            return allFaq;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = FAQRepository;