const JobType = require('../models/job_type.model');

const JobTypeRepository = {

    list: async (req) => {
        try {
            var conditions = {};  
            var and_clauses = [];

            and_clauses.push({});

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
    }

}

module.exports = JobTypeRepository;