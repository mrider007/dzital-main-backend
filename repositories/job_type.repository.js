const JobType = require('../models/job_type.model');

const JobTypeRepository = {

    list: async (req) => {
        try {
            var conditions = {};  
            var and_clauses = [];

            and_clauses.push({});

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;          

            let jobtypes = JobType.aggregate([
                { $match: conditions }
            ]);
            if (!jobtypes) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
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
    }

}

module.exports = JobTypeRepository;