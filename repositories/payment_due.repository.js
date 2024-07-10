const PaymentDue = require("../models/payment_due.model");

const paymentDueRepo = {

    updateById: async (id, data) => {
        try {
            const updatePayment = await PaymentDue.findByIdAndUpdate(id, data, { $new: true });
            return updatePayment
        } catch (error) {
            throw error;
        }
    },

    list: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            if (_.has(req.body, 'status') && req.body.status !== '') {
                and_clauses.push({ status: req.body.status });
            }

            if (and_clauses.length > 0) {
                conditions['$and'] = and_clauses
            }

            const payment_list = PaymentDue.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        pipeline: [{
                            $group: {
                                _id: '$_id',
                                name: { $first: '$name' },
                                email: { $first: '$email' },
                                image: { $first: '$image' },
                                mobile: { $first: '$mobile' },
                            }
                        }],
                        foreignField: '_id',
                        as: 'user'
                    },
                },
                { $unwind: '$user' },
                {
                    $group: {
                        _id: '$_id',
                        user: { $first: '$user' },
                        total_amount: { $first: '$total_amount' },
                        payable_amount: { $first: '$payable_amount' },
                        platform_fees: { $first: '$platform_fees' },
                        last_invoice: { $first: '$last_invoice' },
                        status: { $first: '$status' },
                        createdAt: { $first: '$createdAt' }
                    },
                },
                { $sort: { createdAt: -1 } }
            ])

            var options = { page: req.body?.page || 1, limit: req.body?.limit || 20 };
            let allPayments = await PaymentDue.aggregatePaginate(payment_list, options);
            return allPayments;
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }
}

module.exports = paymentDueRepo;