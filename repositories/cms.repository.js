const CMS = require('../models/cms.model');

const cmsRepository = {

    updateById: async (data, id) => {
        try {
            let cmsUpdate = await CMS.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!cmsUpdate) {
                return null;
            }
            return cmsUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let cms = await CMS.findById(id);
            if (cms) {
                let cmsDelete = await CMS.deleteOne({ _id: id }).exec();
                if (!cmsDelete) {
                    return null;
                }
                return cms;
            }
        } catch (e) {
            throw e;
        }
    },

    getCMS: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ status: 'Active' });

            if (_.isObject(req.body) && _.has(req.body, 'slug')) {
                and_clauses.push({ "slug": req.body.slug });
            }

            conditions['$and'] = and_clauses;

            let cms = await CMS.aggregate([
                { $match: conditions }
            ]);
            if (!cms) {
                return null;
            }
            return cms;
        } catch (e) {
            throw e;
        }
    },

    getCMSList: async (req) => {
        try {
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

            if (_.isObject(req.body) && _.has(req.body, 'status')) {
                if (req.body.status !== 'All') {
                    and_clauses.push({ 'status': req.body.status });
                }
            }

            console.log('and', and_clauses);

            conditions['$and'] = and_clauses;

            let cmslist = CMS.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!cmslist) {
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
            let allCMS = await CMS.aggregatePaginate(cmslist, options);
            return allCMS;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = cmsRepository;