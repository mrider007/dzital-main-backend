const Banner = require("../models/banner.model");

const BannerRepo = {
    
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
                        as: "category_details"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        title2: 1,
                        description: 1,
                        status: 1,
                        category_id: 1,
                        sub_category: '$category_details',
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