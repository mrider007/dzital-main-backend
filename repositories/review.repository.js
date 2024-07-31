const mongoose = require('mongoose');
const Review = require('../models/review.model');

const reviewController = {

    updateById: async (data, id) => {
        try {
            let reviewUpdate = await Review.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!reviewUpdate) {
                return null;
            }
            return reviewUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let review = await Review.findById(id);
            if (review) {
                let reviewDelete = await Review.deleteOne({ _id: id }).exec();
                if (!reviewDelete) {
                    return null;
                }
                return review;
            }
        } catch (e) {
            throw e;
        }
    },

    getReviews: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'product_name': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let reviews = await Review.aggregate([
                {
                    $lookup: {
                        let: { productID: '$productId' },
                        from: "products",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$productID"] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    title: { $first: '$title' },
                                    image: { $first: '$image' }
                                }
                            }
                        ],
                        as: "product_details"
                    }
                },
                // {
                //     $lookup: {
                //         let: { productID: '$productId' },
                //         from: "products",
                //         pipeline: [
                //             {
                //                 $match: {
                //                     $expr: {
                //                         $and: [
                //                             { $eq: ["$_id", "$$productID"] },
                //                         ]
                //                     }
                //                 }
                //             },
                //             {
                //                 $group: {
                //                     _id: '$_id',
                //                     name: { $first: '$name' },
                //                     image: { $first: '$image' }
                //                 }
                //             }
                //         ],
                //         as: "product_details"
                //     }
                // },
                {
                    $lookup: {
                        let: { userID: '$userId' },
                        from: "users",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$userID"] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    name: { $first: '$name' },
                                    image: { $first: '$image' }
                                }
                            }
                        ],
                        as: "user_details"
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        userId: { $first: '$userId' },
                        productId: { $first: '$productId' },
                        product_name: { $first: '$product_details.title' },
                        product_image: { $first: '$product_details.image' },
                        attachments: { $first: '$attachments' },
                        review: { $first: '$review' },
                        rating: { $first: '$rating' },
                        createdAt: { $first: '$createdAt' },
                        user_name: { $first: '$user_details.name' },
                        user_img: { $first: '$user_details.image' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!reviews) {
                return null;
            }

            return reviews;
        } catch (e) {
            throw e;
        }
    },

    list: async (req) => {
        try {

            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ productId: new mongoose.Types.ObjectId(req.body.productId) });

            // if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
            //     and_clauses.push({
            //         $or: [
            //         ]
            //     });
            // }

            conditions['$and'] = and_clauses;

            let reviews = await Review.aggregate([
                {
                    $lookup: {
                        let: { productID: '$productId' },
                        from: "products",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$productID"] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    name: { $first: '$name' },
                                    image: { $first: '$image' }
                                }
                            }
                        ],
                        as: "product_details"
                    }
                },
                {
                    $lookup: {
                        let: { productID: '$productId' },
                        from: "products",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$productID"] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    name: { $first: '$name' },
                                    image: { $first: '$image' }
                                }
                            }
                        ],
                        as: "product_details"
                    }
                },
                {
                    $lookup: {
                        let: { userID: '$userId' },
                        from: "users",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$userID"] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    name: { $first: '$name' },
                                    image: { $first: '$image' }
                                }
                            }
                        ],
                        as: "user_details"
                    }
                },
                { $unwind: { path: '$user_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        userId: { $first: '$userId' },
                        productId: { $first: '$productId' },
                        attachments: { $first: '$attachments' },
                        review: { $first: '$review' },
                        rating: { $first: '$rating' },
                        createdAt: { $first: '$createdAt' },
                        user_name: { $first: '$user_details.name' },
                        user_img: { $first: '$user_details.image' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);
            if (!reviews) {
                return null;
            }

            return reviews;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = reviewController;