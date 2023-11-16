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

            and_clauses.push({});

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

            and_clauses.push({ });

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let cmslist = CMS.aggregate([
                { $match: conditions }
            ]);
            if (!cmslist) {
                return null;
            }
            var options = { page: req.body.page || 1, limit: req.body.limit || 10 };
            let allCMS = await CMS.aggregatePaginate(cmslist, options);
            return allCMS;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = cmsRepository;