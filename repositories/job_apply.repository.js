const JobApply = require("../models/job_apply.model")

const JobApplyRepository = {

    jobSeekerList: async (req) => {
        try {
            var conditions = {}
            var and_clauses = []

            and_clauses.push({})

            conditions['$and'] = and_clauses;

            const pipeline = JobApply.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user_details'
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'product_jobs',
                        localField: 'job_id',
                        foreignField: '_id',
                        as: 'job_details'
                    }
                },
                { $unwind: { path: '$job_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: "$user_id",
                        job_applicant: { $first: '$user_details.name' }
                    }
                },
                { $sort: { job_applicant: 1 } }
            ])
            var options = { page: req.body.page || 1, limit: req.body.limit || 20 };
            let allJobSeeker = await JobApply.aggregatePaginate(pipeline, options);
            return allJobSeeker;

        } catch (error) {
            throw error
        }
    }
}

module.exports = JobApplyRepository;