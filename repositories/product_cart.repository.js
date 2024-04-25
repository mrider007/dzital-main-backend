const ProductCart = require('../models/product_cart.model');

const ProductCartRepository = {

    updateCart: async (field, data) => {
        try {
            let updateProductCart = await ProductCart.findOneAndUpdate(field, data);
            if (!updateProductCart) {
                return null;
            }
            return updateProductCart;
        } catch (e) {
            throw e;
        }
    },

    getUserCart: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ user_id: req.user._id });
            conditions['$and'] = and_clauses;

            let cart = await ProductCart.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        let: { productId: '$items.product_id' },
                        from: "products",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $in: ["$_id", "$$productId"] },
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
                                $group: {
                                    _id: '$_id',
                                    title: { $first: '$title' },
                                    description: { $first: '$description' },
                                    status: { $first: '$status' },
                                    category_id: { $first: '$category_id' },
                                    category_slug: { $first: '$category_details.slug' },
                                    sub_category_id: { $first: '$sub_category_id' },
                                    category_name: { $first: '$category_details.title' },
                                    image: { $first: '$image' },
                                    createdAt: { $first: '$createdAt' },
                                    updatedAt: { $first: '$updatedAt' }
                                }
                            }
                        ],
                        as: "product_details"
                    }
                },
                { $unwind: "$items" }, // Unwind the items array
                {
                    $group: {
                        _id: '$_id',
                        user_id: { $first: '$user_id' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' },
                        quantity: { $sum: '$items.quantity' }, // Summing up quantity of items
                        total_price: { $sum: '$items.total_price' },// Summing up total_price of items
                        items: {
                            $push: {
                                // Construct each item object with product details, quantity, and total_price
                                quantity: "$items.quantity",
                                total_price: "$items.total_price",
                                item_details: { $arrayElemAt: ["$product_details", 0] },
                            }
                        },
                    }
                }
            ]);

            if (!cart) {
                return null;
            }
            return cart[0];
        } catch (e) {
            throw e;
        }
    }
}

module.exports = ProductCartRepository;