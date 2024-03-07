const ProductWishlist = require('../models/product_wishlist.model');

const ProductWishlistRepository = {

    updateWishlist: async (field, data) => {
        try {
            let updateProductWishlist = await ProductWishlist.findOneAndUpdate(field, data);
            if (!updateProductWishlist) {
                return null;
            }
            return updateProductWishlist;
        } catch (e) {
            throw e;
        }
    },

    getUserWishlist: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ user_id: req.user._id });

            conditions['$and'] = and_clauses;

            let wishlist = await ProductWishlist.aggregate([
                { $match: conditions },
                // {
                //     $lookup: {
                //         from: 'products',
                //         localField: 'products.product_id',
                //         foreignField: '_id',
                //         as: 'wishlist'
                //     }
                // },
                {
                    $lookup: {
                        let: { productId: '$products.product_id' },
                        from: "products",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $in: ["$_id", "$$productId"] }] },
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
                                                        { $or: [{ $eq: ["$_id", "$$categoryId"] }] },
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
                                    sub_category_id: { $first: '$sub_category_id' },
                                    category_name: { $first: '$category_details.title' },
                                    image: { $first: '$image' },
                                    createdAt: { $first: '$createdAt' },
                                    updatedAt: { $first: '$updatedAt' }
                                }
                            }
                        ],
                        as: "wishlist"
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        wishlist: { $first: '$wishlist' },
                        user_id: { $first: '$user_id' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' }
                    }
                }
            ]);
            if (!wishlist) {
                return null;
            }
            return wishlist[0];
        } catch (e) {
            throw e;
        }
    }

}

module.exports = ProductWishlistRepository;