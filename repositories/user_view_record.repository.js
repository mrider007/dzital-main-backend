const mongoose = require('mongoose');
const UserProductViewRecord = require('../models/user_view_record.model');

const userProductViewRecordsRepository = {

    List: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ productId: new mongoose.Types.ObjectId(req.body.productId) });

            conditions['$and'] = and_clauses;

            let product_view_records = UserProductViewRecord.aggregate([
                {
                    $lookup: {
                        let: { product: '$productId' },
                        from: "products",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$product"] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "product_details"
                    }
                },
                { $unwind: { path: '$product_details', preserveNullAndEmptyArrays: true } },
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
                                $project: {
                                    name: 1,
                                    email: 1,
                                    image: 1,
                                    mobile: 1,
                                    address: 1
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
                        user_name: { $first: '$user_details.name' },
                        user_email: { $first: '$user_details.email' },
                        user_image: { $first: '$user_details.image' },
                        user_mobile: { $first: '$user_details.mobile' },
                        user_address: { $first: '$user_details.address' },
                        productId: { $first: '$productId' },
                        product_name: { $first: '$product_details.title' },
                        date: { $first: '$date' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: 1 } }
            ]);
            if (!product_view_records) {
                return null;
            }

            return product_view_records;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = userProductViewRecordsRepository;