const Order = require('../models/order.model');

const orderRepository = {

    getUserOrders: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ user_id: req.user._id });

            conditions['$and'] = and_clauses;

            const aggregationPipeline = [
                { $unwind: "$items" },
                {
                    $lookup: {
                        let: { productId: '$items.product_id' },
                        from: "products",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$productId"] },
                                        ]
                                    }
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
                                                        { $eq: ["$_id", "$$categoryId"] },
                                                        { $eq: ['$parentId', null] }
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
                                    let: { seller: '$userId' },
                                    from: "users",
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ["$_id", "$$seller"] }
                                                    ]
                                                }
                                            }
                                        }
                                    ],
                                    as: "seller_details"
                                }
                            },
                            { $unwind: { path: '$seller_details', preserveNullAndEmptyArrays: true } },
                            {
                                $group: {
                                    _id: '$_id',
                                    title: { $first: '$title' },
                                    category_slug: { $first: '$category_details.slug' },
                                    category_name: { $first: '$category_details.title' },
                                    seller_name: { $first: '$seller_details.name' },
                                    image: { $first: '$image' }
                                }
                            }
                        ],
                        as: "items.product"
                    }
                },
                { $unwind: "$items.product" },
                {
                    $group: {
                        _id: "$_id",
                        user_id: { $first: "$user_id" },
                        order_id: { $first: '$order_id' },
                        order_date: { $first: '$order_date' },
                        status: { $first: '$status' },
                        promocode_id: { $first: '$promocode_id' },
                        discount_amount: { $first: '$discount_amount' },
                        total_amount: { $first: '$total_amount' },
                        payment_mode: { $first: '$payment_mode' },
                        items: {
                            $push: {
                                title: '$items.product.title',
                                category_slug: '$items.product.category_slug',
                                category_name: '$items.product.category_name',
                                image: '$items.product.image',
                                quantity: "$items.quantity",
                                total_price: "$items.total_price",
                                seller_name: '$items.product.seller_name'
                            }
                        }
                    }
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ];

            let orders = await Order.aggregate(aggregationPipeline);

            if (!orders) {
                return null;
            }
            return orders;
        } catch (e) {
            throw e;
        }
    },

    getSellerOrders: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            conditions['$and'] = and_clauses;

            const aggregationPipeline = [
                { $unwind: "$items" },
                // discount_amount: { $first: '$discount_amount' },
                //         total_amount: { $first: '$total_amount' },
                //         payment_mode: { $first: '$payment_mode' },
                //         items: {
                //             $push: {
                //                 title: '$items.product.title',
                //                 category_slug: '$items.product.category_slug',
                //                 category_name: '$items.product.category_name',
                //                 image: '$items.product.image',
                //                 quantity: "$items.quantity",
                //                 total_price: "$items.total_price",
                //                 seller_name: '$items.product.seller_name'
                //             }
                //         }
                //     }
                // },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ];

            let orders = await Order.aggregate(aggregationPipeline);

            if (!orders) {
                return null;
            }
            return orders;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = orderRepository;