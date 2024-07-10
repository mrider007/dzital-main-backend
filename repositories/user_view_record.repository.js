const UserProductViewRecord = require('../models/user_view_record.model');

const userProductViewRecordsRepository = {

    List: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

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
                        date: { $first: '$date' },
                        user_details: { $first: '$user_details' },
                        product_details: { $first: '$product_details' }
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