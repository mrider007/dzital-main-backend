const ProductWishlist = require('../models/product_wishlist.model');

const ProductWishlistRepository = {

    addWishlist: async (obj) => {
        try {
            let newproductWishlist = await ProductWishlist.create(obj);
            if (!newproductWishlist) {
                return null;
            }
            return newproductWishlist;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = ProductWishlistRepository;