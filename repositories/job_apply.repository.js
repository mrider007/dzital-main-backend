const JobApply = require("../models/job_apply.model")

const JobApplyRepository = {

    jobSeekerList: async (req) => {
        try {
            var conditions = {}
            var and_clauses = []

            and_clauses.push({})

            conditions['$and'] = and_clauses;

            const pipeline = JobApply.aggregate([
                // { $match: conditions },
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
                        let: { job_id: '$job_id' },
                        from: "product_jobs",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$_id", "$$job_id"]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    let: { subCategory: '$sub_category_id' },
                                    from: "service_categories",
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$subCategory"]
                                                }
                                            }
                                        }
                                    ],
                                    as: "sub_category_details"
                                }
                            },
                            { $unwind: { path: '$sub_category_details', preserveNullAndEmptyArrays: true } },
                            {
                                $group: {
                                    _id: '$_id',
                                    job_title: { $first: '$title' },
                                    image: { $first: '$image' },
                                    sub_category_name: { $first: '$sub_category_details.title' },
                                    sub_category_id: { $first: '$sub_category_id' }
                                }
                            },
                        ],
                        as: "job_details"
                    }
                },
                //{ $unwind: { path: '$job_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: "$user_id",
                        job_details: { $first: '$job_details' },
                        job_applicant: { $first: '$user_details.name' },
                        job_applicant_email: { $first: '$user_details.email' }
                    }
                },
                { $match: conditions },
                { $sort: { job_applicant: 1 } }
            ])
            var options = { page: req.body.page || 1, limit: req.body.limit || 10 };
            let allJobSeeker = await JobApply.aggregatePaginate(pipeline, options);
            return allJobSeeker;

        } catch (error) {
            throw error
        }
    }
}

module.exports = JobApplyRepository;