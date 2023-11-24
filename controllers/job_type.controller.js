const JobType = require('../models/job_type.model');

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
}

module.exports = new JobTypeController();