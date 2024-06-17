const mongoose = require('mongoose');
const Job = require('../models/product_jobs.model');
const AttributeValue = require('../models/attribute_value.model');
const jobRepo = require('../repositories/product_job.repository');
const cloudinary = require('cloudinary');
class JobController {

    constructor() { }

    /** User Job Post */
    async jobPost(req, res) {
        try {
            if (!_.has(req.body, 'title')) {
                res.status(400).send({ status: 400, message: 'Job Title is required' });
            }
            else if (!_.has(req.body, 'description')) {
                res.status(400).send({ status: 400, message: 'Job Description is required' });
            }
            else {
                if (req.files && req.files.length > 0) {
                    var photo;
                    for (let i = 0; i < req.files.length; i++) {
                        const element = req.files[i];
                        if (element.fieldname === 'image') {
                            photo = element.path;
                            const uploadImage = await cloudinary.v2.uploader.upload(photo);
                            req.body.image = uploadImage.secure_url;
                        }
                    }
                }
                req.body.user_id = req.user._id;
                let jobData = await Job.create(req.body);
                if (!_.isEmpty(jobData) && jobData._id) {

                    let attribute_values = [];

                    for (let x = 0; x < req.body.attributeData.length; x++) {

                        req.body.attributeData[x].product_id = req.body.product_id;

                        let attributeData = await AttributeValue.create(req.body.attributeData[x]);
                        if (!_.isEmpty(attributeData)) {
                            attribute_values.push(attributeData);
                        }
                    }

                    res.status(200).send({ status: 200, data: jobData, message: 'Job saved successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Job could not be saved' });
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
            if (_.has(req.body, 'userId')) {
                const userId = new mongoose.Types.ObjectId(req.body.userId);
                let jobs = await jobRepo.getJobs(req, userId);
                if (!_.isEmpty(jobs)) {
                    res.status(200).send({ status: 200, data: jobs.docs, total: jobs.total, limit: jobs.limit, page: jobs.page, pages: jobs.pages, message: 'Product Job list fetched Successfully' });
                } else {
                    res.status(201).send({ status: 201, data: [], message: 'No Jobs Found' });
                }
            }
            else {
                let jobs = await jobRepo.getAllJobs(req);
                if (!_.isEmpty(jobs)) {
                    res.status(200).send({ status: 200, data: jobs.docs, total: jobs.total, limit: jobs.limit, page: jobs.page, pages: jobs.pages, message: 'Product Job list fetched Successfully' });
                } else {
                    res.status(201).send({ status: 201, data: [], message: 'No Jobs Found' });
                }
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
            if (_.has(req.query, 'userId')) {
                const userId = new mongoose.Types.ObjectId(req.query.userId);
                const job_id = new mongoose.Types.ObjectId(req.params.id);
                let jobInfo = await jobRepo.getJobDetails({ _id: job_id }, userId);
                if (!_.isEmpty(jobInfo)) {
                    res.status(200).send({ status: 200, data: jobInfo, message: 'Job Details fetched successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Job not found' });
                }
            }
            else {
                const job_id = new mongoose.Types.ObjectId(req.params.id);
                let jobInfo = await jobRepo.getJobDetails({ _id: job_id });
                if (!_.isEmpty(jobInfo)) {
                    res.status(200).send({ status: 200, data: jobInfo, message: 'Job Details fetched successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Job not found' });
                }
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

                for (let i = 0; i < req.files.length; i++) {
                    const element = req.files[i];
                    if (element.fieldname === 'image') {
                        var image = element.path;
                        const uploadImageResult = await cloudinary.v2.uploader.upload(image);
                        req.body.image = uploadImageResult.secure_url;
                    }
                    if (element.fieldname === 'company_logo') {
                        var company_logo = element.path;
                        const uploadCompanyLogo = await cloudinary.v2.uploader.upload(company_logo);
                        req.body.company_logo = uploadCompanyLogo.secure_url;
                    }
                }
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

    async JobProductsBulkUpdate(req, res) {
        try {
            let productsUpdate = await Job.updateMany({}, { $set: { 'sub_category_id': null } });
            res.status(200).send({ status: 200, data: productsUpdate, message: 'Job Products Updated Successfully' });
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new JobController();