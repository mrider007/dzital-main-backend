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
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user_details"
                    }
                },
                {
                    $group: {
                        _id: "$user_id",
                        job_title: { $first: "$job_title" },
                        status: { $first: '$status' },
                        user_details: { $first: '$user_details' },
                        cv: { $first: "$cv" }
                    }
                }
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