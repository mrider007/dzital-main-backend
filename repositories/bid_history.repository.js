const BidHistory = require('../models/bid_history.model');
const mongoose = require('mongoose');

const bidHistoryRepository = {
    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            if (_.isEmpty(req.body) || !req.body.productId) {
                return null;
            }

            and_clauses.push({ 'productId': new mongoose.Types.ObjectId(req.body.productId) })
            conditions['$and'] = and_clauses;

            let bidHistory = BidHistory.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        pipeline: [{
                            $group: {
                                _id: '$_id',
                                name: { $first: '$name' },
                                image: { $first: '$image' },
                            }
                        }],
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user',
                    }
                },
                { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        productId: { $first: '$productId' },
                        user: { $first: '$user' },
                        bidAmount: { $first: '$bid_amount' },
                        createdAt: { $first: '$createdAt' }
                    }
                }

            ])

            if (!bidHistory) {
                return null;
            }

            var options = { page: req.body.page, limit: req.body.limit };
            let allbids = await BidHistory.aggregatePaginate(bidHistory, options);
            return allbids;

        } catch (e) {
            throw e
        }
    }
}

module.exports = bidHistoryRepository;