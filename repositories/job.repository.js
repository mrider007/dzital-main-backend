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

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'description': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let joblist = Job.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'job_types',
                        localField: 'job_type',
                        foreignField: '_id',
                        as: 'job_type'
                    }
                },
                { $unwind: { path: '$job_type', preserveNullAndEmptyArrays: true } },
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
                        job_type: { $first: '$job_type.title' }
                    }
                },
                { $sort: { _id: 1 } }
            ]);
            if (!joblist) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allJobs = await Job.aggregatePaginate(joblist, options);
            return allJobs;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = JobRepository;