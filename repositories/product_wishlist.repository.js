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
    }

}

module.exports = ProductWishlistRepository;