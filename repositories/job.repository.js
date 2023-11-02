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
                        status: { $first: '$status' },
                        createdAt: { $first: '$createdAt' },
                        client_id: { $first: '$client_id' },
                        user_details: { $first: '$user_details' }
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
    }

}

module.exports = JobRepository;