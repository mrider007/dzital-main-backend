const mongoose = require('mongoose');
const JobType = require('../models/job_type.model');
const jobtypeRepo = require('../repositories/job_type.repository');

class JobTypeController {
    constructor() { }

    async add(req, res) {
        try {
            let jobTypeExist = await JobType.findOne({ title: req.body.title });
            if (!_.isEmpty(jobTypeExist) && jobTypeExist._id) {
                res.send({ status: 400, data: {}, message: 'Job Type Already Exists' });
            } else {
                let saveData = await JobType.create(req.body);
                if (!_.isEmpty(saveData) && saveData._id) {
                    res.send({ status: 200, data: saveData, message: 'Job Type saved successfully' });
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** Admin Job Type List */
    async list(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            }
            else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            }
            else {
                req.body.limit = parseInt(req.body.limit);
            }

            let jobtypes = await jobtypeRepo.list(req);
            if (!_.isEmpty(jobtypes)) {
                res.send({ status: 200, data: jobtypes.docs, total: jobtypes.total, limit: jobtypes.limit, page: jobtypes.page, pages: jobtypes.pages, message: 'Job Type list fetched successfully' });
            }
            else {
                res.send({ status: 201, data: [], message: 'No Job Type found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** User Job Type List */
    async JobTypes(req, res) {
        try {
            let jobtypes = await JobType.find();
            if (!_.isEmpty(jobtypes)) {
                res.send({ status: 200, data: jobtypes, message: 'Job Types has been fetched' });
            } else {
                res.send({ status: 201, data: [], message: 'No Job Type found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async update(req, res) {
        try {
            const job_type_id = new mongoose.Types.ObjectId(req.params.id);
            let JobTypeInfo = await JobType.findOne({ _id: job_type_id });
            if (!_.isEmpty(JobTypeInfo) && JobTypeInfo._id) {
                let jobtypeUpdate = await jobtypeRepo.updateById(req.body, job_type_id);
                if (!_.isEmpty(jobtypeUpdate) && jobtypeUpdate._id) {
                    res.send({ status: 200, data: jobtypeUpdate, message: 'Job Type has been updated successfully' });
                } else {
                    res.send({ status: 400, data: {}, message: 'Sorry, unable to update Job Type at this moment!' });
                }
            } else {
                res.send({ status: 400, data: {}, message: 'Job Type not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new JobTypeController();