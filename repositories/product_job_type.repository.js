const JobType = require('../models/product_job_type.model');

const JobTypeRepository = {

    list: async (req) => {
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

            conditions['$and'] = and_clauses;

            let jobtypes = JobType.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!jobtypes) {
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
            let allJobTypes = await JobType.aggregatePaginate(jobtypes, options);
            return allJobTypes;
        } catch (e) {
            throw e;
        }
    },

    updateById: async (data, id) => {
        try {
            let jobtypeUpdate = await JobType.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!jobtypeUpdate) {
                return null;
            }
            return jobtypeUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            const job_type = await JobType.findById(id);
            if (!_.isEmpty(job_type) && job_type._id) {
                let jobtypeDelete = await JobType.deleteOne({ _id: id }).exec();
                if (!jobtypeDelete) {
                    return null;
                }
                return job_type;
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = JobTypeRepository;