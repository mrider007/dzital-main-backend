const Banner = require("../models/banner.model");

const BannerRepo = {

    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } },
                        { 'title2': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
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

            let banners = Banner.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!banners) {
                return null;
            }

            var options = {};
            if (req.body.page !== undefined) {
                options.page = req.body.page;
            }
            if (req.body.limit !== undefined) {
                options.limit = req.body.limit;
            }
            let bannerList = await Banner.aggregatePaginate(banners, options);
            return bannerList;
        } catch (e) {
            throw e;
        }
    },

    getAll: async () => {
        try {
            const data = await Banner.aggregate([
                {
                    $match: {
                        status: 'Active',
                    }
                },
                {
                    $lookup: {
                        let: { categoryId: '$category_id' },
                        from: "service_categories",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$parentId", "$$categoryId"] }] },
                                        ]
                                    }
                                }
                            },
                            {
                                $sort: { createdAt: -1 },
                            },
                            {
                                $limit: 5
                            }
                        ],
                        as: "sub_category_details"
                    }
                },
                {
                    $lookup: {
                        from: "service_categories",
                        localField: 'category_id',
                        foreignField: '_id',
                        as: "category_details"
                    }
                },
                {
                    $unwind: '$category_details'
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        title2: 1,
                        description: 1,
                        status: 1,
                        category_id: 1,
                        sub_category: '$sub_category_details',
                        category_details: '$category_details',
                        image: 1,
                        primary_color: 1,
                        secondary_color: 1,
                        createdAt: 1,
                    }
                }
            ]);
            return data;
        } catch (error) {
            throw error;
        }
    },

    updateBanner: async (field, data) => {
        try {
            let updateBanner = await Banner.findOneAndUpdate(field, data, { $new: true });
            if (!updateBanner) {
                return null;
            }
            return updateBanner;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = BannerRepo;