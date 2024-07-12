const mongoose = require('mongoose');
const UserSearchRecord = require('../models/user_search_record.model');

const userProductViewRecordsRepository = {

    List: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ categoryId: new mongoose.Types.ObjectId(req.body.categoryId) });

            conditions['$and'] = and_clauses;

            let search_records = await UserSearchRecord.aggregate([
                {
                    $lookup: {
                        let: { category: '$categoryId' },
                        from: "service_categories",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$category"] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "category_details"
                    }
                },
                { $unwind: { path: '$category_details', preserveNullAndEmptyArrays: true } },
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
                        categoryId: { $first: '$categoryId' },
                        category_name: { $first: '$category_details.title' },
                        date: { $first: '$date' }
                    }
                },
                { $match: conditions },
                { $sort: { _id: 1 } }
            ]);
            if (!search_records) {
                return null;
            }

            return search_records;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = userProductViewRecordsRepository;