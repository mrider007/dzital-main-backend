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
}

module.exports = new JobTypeController();