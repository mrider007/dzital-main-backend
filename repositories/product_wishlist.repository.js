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
                {
                    $lookup: {
                        from: 'products',
                        localField: 'products.product_id',
                        foreignField: '_id',
                        as: 'wishlist'
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