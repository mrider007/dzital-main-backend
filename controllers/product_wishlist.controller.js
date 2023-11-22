const mongoose = require('mongoose');
const Wishlist = require('../models/product_wishlist.model');
const User = require('../models/user.model');

class productWishlistController {
    constructor() { }

    async addToWishlist(req, res) {
        try {
            let user = await User.findOne({ _id: req.user._id });
            if (!_.isEmpty(user) && user._id) {
                let productwishlistAdd = await Wishlist.findOne({ user_id: req.user._id, 'products.product_id': { $in: req.body.product_id } });
                if (!_.isEmpty(productwishlistAdd) && productwishlistAdd._id) {
                    res.send({ status: 200, data: {}, message: 'Product is already present in your wishlist' });
                }
                else {
                    req.body.user_id = req.user._id;
                    let arr = [];
                    arr.push({ "product_id": req.body.product_id })
                    req.body.products = arr;
                    let wishlistAdd = await Wishlist.create(req.body);
                    if (!_.isEmpty(wishlistAdd) && wishlistAdd._id) {
                        res.send({ status: 200, data: wishlistAdd, message: 'Product is added to your wishlist' });
                    }
                    else {
                        res.send({ status: 201, data: {}, message: 'Product could not be added to wishlist' });
                    }
                }
            }
            else {
                res.send({ status: 400, data: {}, message: 'User not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new productWishlistController();