const mongoose = require('mongoose');
const JobApply = require("../models/job_apply.model");
const User = require('../models/user.model');

const JobApplyRepository = {

    jobSeekerList: async (req) => {
        try {
            var conditions = {}
            var and_clauses = []

            and_clauses.push({});

            if (_.isObject(req.body) && _.has(req.body, 'sub_category_id') && req.body.sub_category_id !== '') {
                and_clauses.push({ 'job_details.sub_category_id': new mongoose.Types.ObjectId(req.body.sub_category_id) });
            }

            conditions['$and'] = and_clauses;

            const pipeline = User.aggregate([
                {
                    $lookup: {
                        let: { userId: '$_id' },
                        from: "job_applies",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$user_id", "$$userId"]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    let: { tc_margin_id: '$job_id' },
                                    from: "product_jobs",
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$_id", "$$tc_margin_id"]
                                                }
                                            }
                                        },
                                        {
                                            $lookup: {
                                                let: { categoryID: '$sub_category_id' },
                                                from: "service_categories",
                                                pipeline: [
                                                    {
                                                        $match: {
                                                            $expr: {
                                                                $eq: ["$_id", "$$categoryID"]
                                                            }
                                                        }
                                                    }
                                                ],
                                                as: "sub_category_details"
                                            }
                                        },
                                        { $unwind: { path: '$sub_category_details', preserveNullAndEmptyArrays: true } },
                                        {
                                            $addFields: { sub_category_name: '$sub_category_details.title' }
                                        }
                                    ],
                                    as: "job_details"
                                }
                            },
                            { $unwind: { path: '$job_details', preserveNullAndEmptyArrays: true } },
                            {
                                $group: {
                                    _id: '$_id',
                                    user_id: { $first: '$user_id' },
                                    job_id: { $first: '$job_id' },
                                    status: { $first: '$status' },
                                    cv: { $first: '$cv' },
                                    job_title: { $first: '$job_details.title' },
                                    sub_category_id: { $first: '$job_details.sub_category_id' },
                                    sub_category_name: { $first: '$job_details.sub_category_name' }
                                }
                            }
                        ],
                        as: "job_info"
                    }
                },
                {
                    $lookup: {
                        let: { userID: '$_id' },
                        from: "user_job_profiles",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$userId", "$$userID"]
                                    }
                                }
                            }
                        ],
                        as: "job_profile"
                    }
                },
                { $unwind: { path: '$job_profile', preserveNullAndEmptyArrays: true } },
                {
                    $match: {
                        'job_info': { $ne: [] }
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        job_details: { $first: '$job_info' },
                        job_applicant: { $first: '$name' },
                        job_applicant_email: { $first: '$email' },
                        job_applicant_address: { $first: '$address' },
                        job_applicant_image: { $first: '$image' },
                        job_applicant_year_of_experience: { $first: '$job_profile.year_of_experience' }
                    }
                },
                { $match: conditions },
                { $sort: { job_applicant: 1 } }
            ])
            var options = { page: req.body.page || 1, limit: req.body.limit || 10 };
            let allJobSeeker = await User.aggregatePaginate(pipeline, options);
            return allJobSeeker;

        } catch (e) {
            throw e;
        }
    },

    totalApplicantCount: async () => {
        try {

            var conditions = {}
            var and_clauses = []

            and_clauses.push({});

            conditions['$and'] = and_clauses;

            let job_applicants = await JobApply.aggregate([
                {
                    $lookup: {
                        let: { userId: '$user_id' },
                        from: "users",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$_id", "$$userId"]
                                    }
                                }
                            },
                        ],
                        as: "user_details"
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: "$user_id",
                        job_applicant: { $first: '$user_details.name' },
                        job_applicant_email: { $first: '$user_details.email' }
                    }
                },
                { $match: conditions },
                { $sort: { job_applicant: 1 } }
            ]);

            if (!job_applicants) {
                return null;
            }
            return job_applicants;
        } catch (e) {
            throw e;
        }
    },

    jobApplicationsList: async (req) => {
        try {
            var conditions = {}
            var and_clauses = []

            and_clauses.push({});

            if (_.isObject(req.body) && _.has(req.body, 'job_id') && req.body.job_id !== '') {
                and_clauses.push({ 'job_id': new mongoose.Types.ObjectId(req.body.job_id) });
            }

            conditions['$and'] = and_clauses;

            let job_applications = JobApply.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);

            if (!job_applications) {
                return null;
            }
            var options = { page: req.body.page || 1, limit: req.body.limit || 10 };
            let applications = await JobApply.aggregatePaginate(job_applications, options);
            return applications;
        } catch (e) {
            throw e;
        }
    },

    appliedJobsList: async (req) => {
        try {
            var conditions = {}
            var and_clauses = []

            and_clauses.push({ 'user_id': req.user._id });

            // Object(req.body) && _.has(req.body, 'job_id') && req.body.job_id !== '') {
            //     and_clauses.push({ 'user_idjob_id': new mongoose.Types.ObjectId(req.body.job_id) });
            // }

            conditions['$and'] = and_clauses;

            let applied_jobs = JobApply.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);

            if (!applied_jobs) {
                return null;
            }
            var options = { page: req.body.page || 1, limit: req.body.limit || 10 };
            let applications = await JobApply.aggregatePaginate(applied_jobs, options);
            return applications;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = JobApplyRepository;