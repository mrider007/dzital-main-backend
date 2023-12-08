const mongoose = require('mongoose');
const JobProposal = require('../models/product_job_proposal.model');
const jobProposalRepo = require('../repositories/product_job_proposal.repository');
const User = require('../models/user.model');

class JobProposalController {
    constructor() { }

    async addJobProposal(req, res) {
        try {
            let userInfo = await User.findOne({ _id: req.user._id });
            if (!_.isEmpty(userInfo) && userInfo._id) {
                let jobProposalCheck = await JobProposal.findOne({ freelancer_id: req.user._id, job_id: req.body.job_id });
                if (!_.isEmpty(jobProposalCheck)) {
                    res.status(400).send({ status: 400, message: 'Job Proposal already exists for this job' });
                }
                else {
                    req.body.status = 'Pending';
                    req.body.freelancer_id = req.user._id;
                    let jobProposal = await JobProposal.create(req.body);
                    if (!_.isEmpty(jobProposal) && jobProposal._id) {
                        res.status(200).send({ status: 200, data: jobProposal, message: 'Job proposal added successfully' });
                    } else {
                        res.status(400).send({ status: 400, message: 'Job proposal could not be added' });
                    }
                }
            } else {
                res.status(400).send({ status: 400, message: 'User not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async jobProposalDetails(req, res) {
        try {
            let proposal_id = new mongoose.Types.ObjectId(req.params.id);
            let jobProposalInfo = await jobProposalRepo.getProposalDetails({ _id: proposal_id });
            if (!_.isEmpty(jobProposalInfo)) {
                res.status(200).send({ status: 200, data: jobProposalInfo, message: 'Job Proposal details fetched successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'Job Proposal not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async jobProposalList(req, res) {
        try {
            let jobId = new mongoose.Types.ObjectId(req.body.job_id);
            let jobProposals = await JobProposal.find({ 'job_id': jobId });
            if (!_.isEmpty(jobProposals)) {
                res.status(200).send({ status: 200, data: jobProposals, message: 'Job Proposal list for this job fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'No Job Proposal found for this job' })
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async jobProposalUpdate(req, res) {
        try {
            let proposal_id = new mongoose.Types.ObjectId(req.params.id);
            let jobProposalInfo = await JobProposal.findOne({ _id: proposal_id });
            if (!_.isEmpty(jobProposalInfo)) {
                let jobProposalUpdate = await jobProposalRepo.updateById(req.body, proposal_id);
                if (!_.isEmpty(jobProposalUpdate) && jobProposalUpdate._id) {
                    res.status(200).send({ status: 200, data: jobProposalUpdate, message: 'Job Proposal has been updated successfully' });
                } else {
                    res.status(400).send({ status: 400, message: 'Job Proposal could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, message: 'Job Proposal not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async jobProposalDelete(req, res) {
        try {
            let proposal_id = new mongoose.Types.ObjectId(req.params.id);
            let proposalInfo = await JobProposal.findOne({ _id: proposal_id });
            if (!_.isEmpty(proposalInfo) && proposalInfo._id) {
                let proposalDelete = await jobProposalRepo.delete(proposal_id);
                if (!_.isEmpty(proposalDelete) && proposalDelete._id) {
                    res.status(200).send({ status: 200, data: proposalDelete, message: 'Job Proposal has been removed successfully' });
                } else {
                    res.status(400).send({ status: 400, data: {}, message: 'Job Proposal could not be removed' });
                }
            }
            else {
                res.send({ status: 400, message: 'Job Proposal not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async jobProposalStatusUpdate(req, res) {
        try {
            let proposal_id = new mongoose.Types.ObjectId(req.params.id);
            let jobProposalInfo = await JobProposal.findOne({ _id: proposal_id });
            if (!_.isEmpty(jobProposalInfo) && jobProposalInfo._id) {
                let proposalStatusUpdate = await jobProposalRepo.updateById(req.body, proposal_id);
                if (!_.isEmpty(proposalStatusUpdate) && proposalStatusUpdate._id) {
                    res.status(200).send({ status: 200, data: proposalStatusUpdate, message: 'Job Proposal status has been updated' });
                } else {
                    res.status(400).send({ status: 400, message: 'Job Proposal status could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, message: 'Job Proposal not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new JobProposalController();