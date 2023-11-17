const mongoose = require('mongoose');
const Job = require('../models/job.model');
const Admin = require('../models/admin.model');
const jobRepo = require('../repositories/job.repository');

class JobController {
    constructor() { }

    async jobPost(req, res) {
        try {
            if (!_.has(req.body, 'title')) {
                res.send({ status: 400, message: 'Job Title is required' });
            }
            else if (!_.has(req.body, 'description')) {
                res.send({ status: 400, message: 'Job Description is required' });
            }
            else if (!_.has(req.body, 'budget')) {
                res.send({ status: 400, message: 'Budget Amount is required' });
            }
            else {
                let adminInfo = await Admin.findOne({ _id: req.user._id });
                if (!_.isEmpty(adminInfo)) {
                    req.body.client_id = adminInfo._id;
                    let jobSave = await Job.create(req.body);
                    if (!_.isEmpty(jobSave) && jobSave._id) {
                        res.send({ status: 200, data: jobSave, message: 'Job Post saved successfully' });
                    }
                    else {
                        res.send({ status: 400, message: 'Job Post could not be saved' });
                    }
                } else {
                    res.send({ status: 400, message: 'Admin not found' });
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async jobList(req, res) {
        try {
            let jobs = await Job.find({ 'client_id': req.user._id });
            if (!_.isEmpty(jobs)) {
                res.send({ status: 200, data: jobs, message: 'client jobs list fetched successfully' });
            } else {
                res.send({ status: 201, data: [], message: 'no client jobs found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async jobDetails(req, res) {
        try {
            const job_id = new mongoose.Types.ObjectId(req.params.id);
            let jobInfo = await jobRepo.getJobDetails({ _id: job_id });
            if (!_.isEmpty(jobInfo)) {
                res.send({ status: 200, data: jobInfo, message: 'Job details fetched successfully' });
            }
            else {
                res.send({ status: 400, message: 'Job not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async jobUpdate(req, res) {
        try {
            let job_id = new mongoose.Types.ObjectId(req.params.id);
            let jobInfo = await Job.findOne({ _id: job_id });
            if (!_.isEmpty(jobInfo) && jobInfo._id) {
                let jobUpdate = await jobRepo.updateById(req.body, req.params.id);
                if (!_.isEmpty(jobUpdate) && jobUpdate._id) {
                    res.send({ status: 200, data: jobUpdate, message: 'Job has been updated successfully' })
                }
                else {
                    res.send({ status: 400, message: 'Job could not be updated' });
                }
            } else {
                res.send({ status: 400, message: 'Job not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async changeStatus(req, res) {
        try {
            let job_id = new mongoose.Types.ObjectId(req.params.id);
            let jobInfo = await Job.findOne({ _id: job_id });
            if (!_.isEmpty(jobInfo) && jobInfo._id) {
                let statusUpdate = await jobRepo.updateById(req.body, job_id);
                if (!_.isEmpty(statusUpdate) && statusUpdate._id) {
                    res.send({ status: 200, data: statusUpdate, message: 'Job Status has been updated successfully' });
                } else {
                    res.send({ status: 400, data: {}, message: 'Job Status could not be updated' });
                }
            } else {
                res.send({ status: 400, data: {}, message: 'Job not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async jobDelete(req, res) {
        try {
            let job_id = new mongoose.Types.ObjectId(req.params.id);
            let jobInfo = await Job.findOne({ _id: job_id });
            if (!_.isEmpty(jobInfo) && jobInfo._id) {
                const deleteData = await jobRepo.delete(job_id);
                if (!_.isEmpty(deleteData) && deleteData._id) {
                    res.send({ status: 200, data: deleteData, message: 'Job has been removed successfully' });
                } else {
                    res.send({ status: 400, message: 'Sorry, unable to remove job at the moment' });
                }
            } else {
                res.send({ status: 400, message: 'Job not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new JobController();