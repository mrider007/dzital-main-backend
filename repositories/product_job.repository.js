const mongoose = require('mongoose');
const Job = require('../models/product_jobs.model');

const JobRepository = {

    updateById: async (data, id) => {
        try {
            let jobUpdate = await Job.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!jobUpdate) {
                return null;
            }
            return jobUpdate;
        } catch (e) {
            return e;
        }
    },

    getJobDetails: async (params) => {
        try {
            let jobInfo = await Job.aggregate([
                { $match: params },
                {
                    $lookup: {
                        from: 'service_categories',
                        localField: 'category_id',
                        foreignField: '_id',
                        as: 'category_details'
                    }
                },
                { $unwind: { path: '$category_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'service_categories',
                        localField: 'sub_category_id',
                        foreignField: '_id',
                        as: 'sub_category_details'
                    }
                },
                { $unwind: { path: '$sub_category_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user_details'
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'product_details'
                    }
                },
                { $unwind: { path: '$product_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        let: { subcategoryId: '$sub_category_id' },
                        from: "attributes",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$sub_category_id", "$$subcategoryId"] }] },
                                        ]
                                    }
                                }
                            },
                            { $sort: { _id: 1 } }
                        ],
                        as: "attribute_details"
                    }
                },
                {
                    $lookup: {
                        let: { productId: '$product_id' },
                        from: "attribute_values",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$product_id", "$$productId"] }] },
                                        ]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    from: "attributes",
                                    localField: 'attribute_id',
                                    foreignField: '_id',
                                    as: "attribute"
                                }
                            },
                            { $unwind: { path: '$attribute', preserveNullAndEmptyArrays: true } },
                            {
                                $group: {
                                    _id: '$_id',
                                    product_id: { $first: '$product_id' },
                                    attribute_id: { $first: '$attribute_id' },
                                    attribute: { $first: '$attribute.attribute' },
                                    value: { $first: '$value' },
                                    createdAt: { $first: '$createdAt' },
                                    updatedAt: { $first: '$updatedAt' }
                                }
                            },
                            { $sort: { _id: 1 } }
                        ],
                        as: "attribute_value_details"
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        image: { $first: '$image' },
                        user_id: { $first: '$user_id' },
                        product_id: { $first: '$product_id' },
                        status: { $first: '$product_details.status' },
                        bid_now: { $first: '$product_details.bid_now' },
                        bid_start_price: { $first: '$product_details.bid_start_price' },
                        bid_increament_value: { $first: '$product_details.bid_increament_value' },
                        bid_entry: { $first: '$product_details.bid_entry' },
                        bid_start_date: { $first: '$product_details.bid_start_date' },
                        bid_end_date: { $first: '$product_details.bid_end_date' },
                        category_id: { $first: '$category_id' },
                        category_name: { $first: '$category_details.title' },
                        sub_category_id: { $first: '$sub_category_id' },
                        sub_category_name: { $first: '$sub_category_details.title' },
                        createdAt: { $first: '$createdAt' },
                        attributes: { $first: '$attribute_details' },
                        attribute_values: { $first: '$attribute_value_details' }
                    }
                }
            ]);
            if (!jobInfo) {
                return null;
            }
            return jobInfo[0];
        } catch (e) {
            return e;
        }
    },

    delete: async (id) => {
        try {
            let job = await Job.findById(id);
            if (job) {
                let jobDelete = await Job.deleteOne({ _id: id }).exec();
                if (!jobDelete) {
                    return null;
                }
                return job;
            }
        } catch (e) {
            throw e
        }
    },

    List: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ status: 'Approved' });

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });

                // Check if keyword_search has length greater than 0
                if (key.length > 0) {
                    // Disable req.body.page and req.body.limit
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }

            if (_.isObject(req.body) && _.has(req.body, 'category_id')) {
                and_clauses.push({ 'category_id': new mongoose.Types.ObjectId(req.body.category_id) });
            }

            conditions['$and'] = and_clauses;

            let jobs = Job.aggregate([
                {
                    $lookup: {
                        from: 'service_categories',
                        localField: 'category_id',
                        foreignField: '_id',
                        as: 'category_details'
                    }
                },
                { $unwind: { path: '$category_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user_details'
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'product_details'
                    }
                },
                { $unwind: { path: '$product_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        status: { $first: '$product_details.status' },
                        skills: { $first: '$skills' },
                        job_type: { $first: '$job_type' },
                        category_id: { $first: '$category_id' },
                        //user_name: { $first: '$user_details.name' },
                        category_name: { $first: '$category_details.title' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!jobs) {
                return null;
            }

            // Only set options if they are not disabled
            var options = {};
            if (req.body.page !== undefined) {
                options.page = req.body.page;
            }
            if (req.body.limit !== undefined) {
                options.limit = req.body.limit;
            }

            let allJobs = await Job.aggregatePaginate(jobs, options);
            return allJobs;
        } catch (e) {
            throw e;
        }
    },

    getJobList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'description': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });

                // Check if keyword_search has length greater than 0
                if (key.length > 0) {
                    // Disable req.body.page and req.body.limit
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }

            conditions['$and'] = and_clauses;

            let joblist = Job.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'product_job_types',
                        localField: 'job_type',
                        foreignField: '_id',
                        as: 'job_type_details'
                    }
                },
                { $unwind: { path: '$job_type_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user_details'
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: "$title" },
                        description: { $first: "$description" },
                        createdAt: { $first: '$createdAt' }
                    }
                },
                { $sort: { _id: -1 } }
            ]);
            if (!joblist) {
                return null;
            }

            // Only set options if they are not disabled
            var options = {};
            if (req.body.page !== undefined) {
                options.page = req.body.page;
            }
            if (req.body.limit !== undefined) {
                options.limit = req.body.limit;
            }

            let allJobs = await Job.aggregatePaginate(joblist, options);
            return allJobs;
        } catch (e) {
            throw e;
        }
    },

    /** Product Job List */
    getJobs: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ status: 'Approved' });

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'description': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });

                // Check if keyword_search has length greater than 0
                if (key.length > 0) {
                    // Disable req.body.page and req.body.limit
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }
              // Filter based on in attribute & its value
              let filter = req.body.filter;
           
              if (filter && _.isArray(filter)) {
                  filter.forEach((item) => {
                      if (!!item && _.isObject(item) && _.has(item, 'attribute') && _.has(item, 'value')) {
                          and_clauses.push(
                              {
                                  'attribute_values': {
                                      $elemMatch: item
                                  }
                              }
                          );
                      }
                  })
              }
              // Filter based on sub category
              let sub_category_id = req.body.sub_category_id
  
              if(sub_category_id){
                  and_clauses.push({ 'sub_category_id': new mongoose.Types.ObjectId(sub_category_id) });
              }
            //   console.log(and_clauses)

            conditions['$and'] = and_clauses;

            let joblist = Job.aggregate([
                {
                    $lookup: {
                        from: 'product_job_types',
                        localField: 'job_type',
                        foreignField: '_id',
                        as: 'job_type_details'
                    }
                },
                { $unwind: { path: '$job_type_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'product_details'
                    }
                },
                { $unwind: { path: '$product_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        let: { productId: '$product_id' },
                        from: "attribute_values",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$product_id", "$$productId"] }] },
                                        ]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    from: "attributes",
                                    localField: 'attribute_id',
                                    foreignField: '_id',
                                    as: "attribute"
                                }
                            },
                            { $unwind: { path: '$attribute', preserveNullAndEmptyArrays: true } },
                            {
                                $group: {
                                    _id: '$_id',
                                    attribute: { $first: '$attribute.attribute' },
                                    value: { $first: '$value' },
                                }
                            },
                            { $sort: { _id: 1 } }
                        ],
                        as: "attribute_value_details"
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: "$title" },
                        description: { $first: "$description" },
                        category_id: { $first: "$category_id" },
                        sub_category_id: { $first: "$sub_category_id" },
                        status: { $first: '$product_details.status' },
                        attribute_values: { $first: '$attribute_value_details' },
                        product_id: { $first: '$product_id' },
                        image: { $first: '$image' },
                        createdAt: { $first: '$createdAt' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!joblist) {
                return null;
            }

            // Only set options if they are not disabled
            var options = {};
            if (req.body.page !== undefined) {
                options.page = req.body.page;
            }
            if (req.body.limit !== undefined) {
                options.limit = req.body.limit;
            }

            let allJobs = await Job.aggregatePaginate(joblist, options);
            return allJobs;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = JobRepository;