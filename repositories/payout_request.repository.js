const mongoose = require('mongoose');
const PayoutRequest = require("../models/payout_request.model")

const PayoutRequestRepository = {

    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            if (_.has(req.body, 'status') && req.body.status !== '') {
                and_clauses.push({ 'status': req.body.status })
            }
            if (_.has(req.body, 'user_id') && req.body.user_id !== '') {
                and_clauses.push({ 'user_id': new mongoose.Types.ObjectId(req.body.user_id) })
            }

            conditions['$and'] = and_clauses;

            const pipeline = PayoutRequest.aggregate([
                { $match: conditions },
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
                        requested_amount: { $first: '$amount' },
                        status: { $first: '$status' },
                        user_name: { $first: '$user_details.name' },
                        user_email: { $first: '$user_details.email' },
                        user_mobile: { $first: '$user_details.mobile' },
                        wallet_amount: { $first: '$user_details.wallet_amount' },
                        remarks: { $first: '$remarks' },
                        user_id: { $first: '$user_details._id' },
                        createdAt: { $first: '$createdAt' },
                    }
                },
                { $sort: { createdAt: -1 } }
            ])

            var options = { page: req.body.page || 1, limit: req.body.limit || 20 };
            const request_list = await PayoutRequest.aggregatePaginate(pipeline, options);

            return request_list;
        } catch (e) {
            throw e;
        }
    },

    updateOne: async (field, value) => {
        try {
            const updatedRequest = await PayoutRequest.findOneAndUpdate(field, value, { $new: true });
            if (!updatedRequest) {
                return null;
            }
            return updatedRequest;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = PayoutRequestRepository;