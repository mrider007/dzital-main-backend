const Job = require('../models/job.model');

const JobRepository = {

    updateById: async (data, id) => {
        try {
            let jobUpdate = await Job.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!jobUpdate) {
                return null;
            }
            return jobUpdate;
        } catch (e) {
            return e;
        }
    },

    getJobDetails: async (params) => {
        try {
            let jobInfo = await Job.aggregate([
                { $match: params },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'client_id',
                        foreignField: '_id',
                        as: 'user_details'
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'job_types',
                        localField: 'job_type',
                        foreignField: '_id',
                        as: 'job_type_details'
                    }
                },
                { $unwind: { path: '$job_type_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        budget: { $first: '$budget' },
                        date: { $first: '$date' },
                        skills: { $first: '$skills' },
                        status: { $first: '$status' },
                        createdAt: { $first: '$createdAt' },
                        client_id: { $first: '$client_id' },
                        job_type: { $first: '$job_type' },
                        posted_by: { $first: '$user_details.name' }
                    }
                }
            ]);
            if (!jobInfo) {
                return null;
            }
            return jobInfo[0];
        } catch (e) {
            return e;
        }
    },

    delete: async (id) => {
        try {
            let job = await Job.findById(id);
            if (job) {
                let jobDelete = await Job.deleteOne({ _id: id }).exec();
                if (!jobDelete) {
                    return null;
                }
                return job;
            }
        } catch (e) {
            return e;
        }
    },

    getJobList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'description': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
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

            let joblist = Job.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'job_types',
                        localField: 'job_type',
                        foreignField: '_id',
                        as: 'job_type_details'
                    }
                },
                { $unwind: { path: '$job_type_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'client_id',
                        foreignField: '_id',
                        as: 'user_details'
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        client_id: { $first: "$client_id" },
                        title: { $first: "$title" },
                        description: { $first: "$description" },
                        skills: { $first: '$skills' },
                        budget: { $first: '$budget' },
                        date: { $first: "$date" },
                        status: { $first: "$status" },
                        posted_by: { $first: '$user_details.name' },
                        job_type: { $first: '$job_type' },
                        job_type_title: { $first: '$job_type_details.title' }
                    }
                },
                { $sort: { _id: -1 } }
            ]);
            if (!joblist) {
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

            let allJobs = await Job.aggregatePaginate(joblist, options);
            return allJobs;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = JobRepository;