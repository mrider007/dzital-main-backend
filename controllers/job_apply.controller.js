const JobApply = require('../models/job_apply.model');
const product_jobsModel = require('../models/product_jobs.model');
const JobApplyRepo = require('../repositories/job_apply.repository');

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
            if (_.isEmpty(jobData) || !jobData._id) return res.status(404).send({ status: 404, message: 'Product Not Found' });
            if (jobData.user_id === userId) return res.status(400).send({ status: 400, message: 'You can not apply on your own job' });

            const url = `https://www.dzital.com/uploads/cv/${req.file.filename}`;
            req.body.cv = url;

            const saveData = await JobApply.create(req.body);
            if (!_.isEmpty(saveData) && saveData._id) {
                res.status(200).send({ status: 200, data: saveData, message: 'Application has been saved successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'Application could not be saved' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async jobApplicantsList(req, res) {
        try {
            let job_applicants_list = await JobApplyRepo.jobSeekerList(req);
            let job_applicants = await JobApplyRepo.totalApplicantCount();
            let total_count = job_applicants.length;
            if (!_.isEmpty(job_applicants)) {
                res.status(200).send({ status: 200, data: job_applicants_list.docs, total: job_applicants_list.total, limit: job_applicants_list.limit, page: job_applicants_list.page, pages: job_applicants_list.pages, total_count, message: 'Job Applicants List Fetched Successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'No Job Applicants Found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** Job Applications List of a Particular Job */
    async jobApplicationsList(req, res) {
        try {
            let job_applicants_list = await JobApplyRepo.jobApplicationsList(req);
            if (!_.isEmpty(job_applicants_list)) {
                res.status(200).send({ status: 200, data: job_applicants_list.docs, total: job_applicants_list.total, limit: job_applicants_list.limit, page: job_applicants_list.page, pages: job_applicants_list.pages, message: 'Job Applications List' });
            } else {
                res.status(400).send({ status: 400, message: 'No Job Application Found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new JobApplyController();