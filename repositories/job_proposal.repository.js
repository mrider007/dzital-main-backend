const JobProposal = require('../models/job_proposal.model');

const JobProposalRepository = {

    updateById: async (data, id) => {
        try {
            let jobProposalUpdate = await JobProposal.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!jobProposalUpdate) {
                return null;
            }
            return jobProposalUpdate;
        } catch (e) {
            return e;
        }
    },

    getProposalDetails: async (params) => {
        try {
            let proposals = await JobProposal.aggregate([
                { $match: params },
                {
                    $lookup: {
                        from: 'jobs',
                        localField: 'job_id',
                        foreignField: '_id',
                        as: 'job_details'
                    }
                },
                { $unwind: { path: '$job_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'freelancer_id',
                        foreignField: '_id',
                        as: 'user_details'
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        proposal_text: { $first: '$proposal_text' },
                        job_id: { $first: '$job_id' },
                        freelancer_id: { $first: '$freelancer_id' },
                        amount: { $first: '$amount' },
                        status: { $first: '$status' },
                        job_details: { $first: '$job_details' },
                        user_details: { $first: '$user_details' },
                        createdAt: { $first: '$createdAt' }
                    }
                }
            ]);
            if (!proposals) {
                return null;
            }
            return proposals;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let job_proposal = await JobProposal.findById(id);
            if (job_proposal) {
                let JobProposalDelete = await JobProposal.deleteOne({ _id: id }).exec();
                if (!JobProposalDelete) {
                    return null;
                }
                return job_proposal;
            }
        } catch (e) {
            return e;
        }
    }

}

module.exports = JobProposalRepository;