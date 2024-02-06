const mongoose = require('mongoose');
const Job = require('../models/product_jobs.model');
const Product = require('../models/product.model');
const Category = require('../models/service_master.model');
const jobRepo = require('../repositories/product_job.repository');

class JobController {
    constructor() { }

    /** Admin Job Post */
    async jobPost(req, res) {
        try {
            if (!_.has(req.body, 'title')) {
                res.status(400).send({ status: 400, message: 'Job Title is required' });
            }
            else if (!_.has(req.body, 'description')) {
                res.status(400).send({ status: 400, message: 'Job Description is required' });
            }
            else {
                let job_category = await Category.findOne({ title: 'Jobs' });
                req.body.category_id = job_category._id;
                let productSave = await Product.create(req.body);
                if (!_.isEmpty(productSave) && productSave._id) {
                    req.body.product_id = productSave._id;
                    let jobData = await Job.create(req.body);
                    if (!_.isEmpty(jobData) && jobData._id) {
                        res.status(200).send({ status: 200, data: jobData, message: 'Job saved successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Job could not be saved' });
                    }            
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async productJobList(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            } else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            } else {
                req.body.limit = parseInt(req.body.limit);
            }
            let jobs = await jobRepo.getJobs(req);
            if (!_.isEmpty(jobs)) {
                res.status(200).send({ status: 200, data: jobs.docs, total: jobs.total, limit: jobs.limit, page: jobs.page, pages: jobs.pages, message: 'Product Job list fetched Successfully' });
            } else {
                res.status(201).send({ status: 201, data: [], message: 'No Jobs Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Job List */
    async jobList(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            } else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            } else {
                req.body.limit = parseInt(req.body.limit);
            }
            let jobs = await jobRepo.getJobList(req);
            if (!_.isEmpty(jobs)) {
                res.status(200).send({ status: 200, data: jobs.docs, total: jobs.total, limit: jobs.limit, page: jobs.page, pages: jobs.pages, message: 'client jobs list fetched successfully' });
            } else {
                res.status(201).send({ status: 201, data: [], message: 'No Jobs Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async jobDetails(req, res) {
        try {
            const job_id = new mongoose.Types.ObjectId(req.params.id);
            let jobInfo = await jobRepo.getJobDetails({ _id: job_id });
            if (!_.isEmpty(jobInfo)) {
                res.status(200).send({ status: 200, data: jobInfo, message: 'Job Details fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Job not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async userJobs(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            } else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            } else {
                req.body.limit = parseInt(req.body.limit);
            }
            let jobs = await jobRepo.List(req);
            if (!_.isEmpty(jobs)) {
                res.status(200).send({ status: 200, data: jobs.docs, total: jobs.total, limit: jobs.limit, page: jobs.page, pages: jobs.pages, message: 'client jobs list fetched successfully' });
            } else {
                res.status(201).send({ status: 201, data: [], message: 'No Jobs Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async jobUpdate(req, res) {
        try {
            let job_id = new mongoose.Types.ObjectId(req.params.id);
            let jobInfo = await Job.findOne({ _id: job_id });
            if (!_.isEmpty(jobInfo) && jobInfo._id) {
                let jobUpdate = await jobRepo.updateById(req.body, req.params.id);
                if (!_.isEmpty(jobUpdate) && jobUpdate._id) {
                    res.status(200).send({ status: 200, data: jobUpdate, message: 'Job has been updated successfully' })
                }
                else {
                    res.status(400).send({ status: 400, message: 'Job could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, message: 'Job not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async changeStatus(req, res) {
        try {
            let job_id = new mongoose.Types.ObjectId(req.params.id);
            let jobInfo = await Job.findOne({ _id: job_id });
            if (!_.isEmpty(jobInfo) && jobInfo._id) {
                let statusUpdate = await jobRepo.updateById(req.body, job_id);
                if (!_.isEmpty(statusUpdate) && statusUpdate._id) {
                    res.status(200).send({ status: 200, data: statusUpdate, message: 'Job Status has been updated successfully' });
                } else {
                    res.status(400).send({ status: 400, data: {}, message: 'Job Status could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Job not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async jobDelete(req, res) {
        try {
            let job_id = new mongoose.Types.ObjectId(req.params.id);
            let jobInfo = await Job.findOne({ _id: job_id });
            if (!_.isEmpty(jobInfo) && jobInfo._id) {
                const deleteData = await jobRepo.delete(job_id);
                if (!_.isEmpty(deleteData) && deleteData._id) {
                    res.status(200).send({ status: 200, data: deleteData, message: 'Job has been removed successfully' });
                } else {
                    res.status(400).send({ status: 400, message: 'Sorry, unable to remove job at the moment' });
                }
            } else {
                res.status(400).send({ status: 400, message: 'Job not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new JobController();