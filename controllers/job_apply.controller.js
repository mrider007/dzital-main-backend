const JobApply = require('../models/job_apply.model');
const product_jobsModel = require('../models/product_jobs.model');
require("dotenv/config")

class JobApplyController {
    constructor() { }

    async addApplication(req, res) {
        try {
            const userId = req.user._id
            req.body.user_id = userId;
            if (!req.file) {
                return res.status(400).send({ status: 400, message: 'No File Uploaded' });
            }
            const checkApplication = await JobApply.findOne({ user_id: userId, job_id: req.body.job_id })

            if (!_.isEmpty(checkApplication) && checkApplication._id) {
                return res.status(400).send({ status: 400, message: "You Already Applied For This Job" })
            }

            const jobData = await product_jobsModel.findById(req.body.job_id)
            if (_.isEmpty(jobData) || !jobData._id) return res.status(404).send({ status: 404, message: "product not found" })
            if (jobData.user_id === userId) return res.status(400).send({ status: 400, message: 'Can not apply on your own job' })

            const url = `http://13.201.212.185:4200/uploads/cv/${req.file.filename}`;
            req.body.cv = url;

            const saveData = await JobApply.create(req.body);
            if (!_.isEmpty(saveData) && saveData._id) {
                res.status(200).send({ status: 200, data: saveData, message: 'Application has been saved successfully' });
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Application could not be added' });
            }

        } catch (error) {
            res.send({ status: 500, message: error.message });
        }
    }

}

module.exports = new JobApplyController();