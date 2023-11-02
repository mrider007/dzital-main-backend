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

    getCMSList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            if (_.isObject(req.body) && _.has(req.body, 'title')) {
                and_clauses.push({ $or: [{ "title": { $regex: (req.body.title).trim(), $options: 'i' } }] });
            }

            if (_.isObject(req.body) && _.has(req.body, 'slug')) {
                and_clauses.push({ $or: [{ "slug": { $regex: (req.body.slug).trim(), $options: 'i' } }] });
            }

            conditions['$and'] = and_clauses;

            let cmslist = await CMS.aggregate([
                { $match: conditions }
            ]);
            if (!cmslist) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allCMS = await CMS.aggregatePaginate(cmslist, options);
            return allCMS;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = cmsRepository;