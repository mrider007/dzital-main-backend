const mongoose = require("mongoose");
const Transaction = require("../models/transaction.model");

const TransactionRepository = {

    updateById: async (id, data) => {
        try {
            let paymentUpdate = await Transaction.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!paymentUpdate) {
                return null;
            }
            return paymentUpdate;
        } catch (e) {
            throw e;
        }
    },

    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            if (_.has(req.body, 'user_id') && req.body.user_id !== '') {
                and_clauses.push({ user_id: new mongoose.Types.ObjectId(req.body.user_id) });
            }

            conditions['$and'] = and_clauses;

            const payment_list = Transaction.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        let: { user: '$user_id' },
                        from: "users",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$user"] },
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    name: { $first: '$name' },
                                    email: { $first: '$email' },
                                    image: { $first: '$image' },
                                    mobile: { $first: '$mobile' },
                                }
                            }
                        ],
                        as: "seller_details"
                    }
                },
                { $unwind: '$seller_details' },
                {
                    $group: {
                        _id: '$_id',
                        seller: { $first: '$seller_details' },
                        opening_amount: { $first: '$opening_amount' },
                        credit: { $first: '$credit' },
                        debit: { $first: '$debit' },
                        closing_amount: { $first: '$closing_amount' },
                        createdAt: { $first: '$createdAt' }
                    }
                },
                { $sort: { createdAt: -1 } }
            ]);

            var options = { page: req.body?.page || 1, limit: req.body?.limit || 20 };
            let allPayments = await Transaction.aggregatePaginate(payment_list, options);

            return allPayments;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = TransactionRepository;