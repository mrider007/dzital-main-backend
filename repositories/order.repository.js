const Order = require('../models/order.model');

const orderRepository = {

    getUserOrders: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ user_id: req.user._id });

            conditions['$and'] = and_clauses;

            const aggregationPipeline = [
                { $match: conditions },
                { $sort: { _id: -1 } }
            ];

            let orders = await Order.aggregate(aggregationPipeline);

            if (!orders) {
                return null;
            }
            return orders[0];
        } catch (e) {
            throw e;
        }
    }

}

module.exports = orderRepository;