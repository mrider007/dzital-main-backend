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
                    $match: {
                        'job_info': { $ne: [] }
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        job_details: { $first: '$job_info' },
                        job_applicant: { $first: '$name' },
                        job_applicant_email: { $first: '$email' }
                    }
                },
                { $match: conditions },
                { $sort: { job_applicant: 1 } }
            ])
            var options = { page: req.body.page || 1, limit: req.body.limit || 10 };
            let allJobSeeker = await User.aggregatePaginate(pipeline, options);
            return allJobSeeker;

        } catch (error) {
            throw error
        }
    }
}

module.exports = JobApplyRepository;