const mongoose = require('mongoose');
const Wishlist = require('../models/product_wishlist.model');
const productwishlistRepo = require('../repositories/product_wishlist.repository');
const User = require('../models/user.model');

class productWishlistController {
    constructor() { }

    /** Product Add to wishlist */
    async addToWishlist(req, res) {
        try {
            let user = await User.findOne({ _id: req.user._id });
            if (!_.isEmpty(user) && user._id) {
                let productwishlistAdd = await Wishlist.findOne({ user_id: req.user._id, 'products.product_id': { $in: req.body.product_id } });
                if (!_.isEmpty(productwishlistAdd) && productwishlistAdd._id) {
                    res.send({ status: 200, data: {}, message: 'Product is already present in your wishlist' });
                }
                else {
                    let wishlist_exist = await Wishlist.findOne({ user_id: req.user._id });
                    if (_.isEmpty(wishlist_exist)) {
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
                    else {
                        let updateWishlist = await productwishlistRepo.updateWishlist({ user_id: req.user._id }, { $push: { 'products': { product_id: req.body.product_id } } });
                        if (!_.isEmpty(updateWishlist)) {
                            let userwishlist = await Wishlist.findOne({ user_id: req.user._id });
                            res.send({ status: 200, data: userwishlist, message: 'Product is added to your wishlist' });
                        }
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

    /** User Wishlist */
    async userProductWishlist(req, res) {
        try {
        let userwishlistInfo = await productwishlistRepo.getUserWishlist(req);//findOne({ user_id: req.user._id });
            if (!_.isEmpty(userwishlistInfo)) {
                res.send({ status: 200, data: userwishlistInfo, message: 'User Wishlist fetched successfully' });
            }
            else {
                res.send({ status: 400, data: {}, message: 'You have no product in your wishlist' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** Product Remove From Wishlist */
    async removeFromWishlist(req, res) {
        try {
            let userId = req.user._id;
            let wishlist_exist = await Wishlist.findOne({ user_id: userId, 'products.product_id': { $in: new mongoose.Types.ObjectId(req.body.product_id) } });
            if (_.isEmpty(wishlist_exist)) {
                res.send({ status: 400, data: {}, message: 'Product is not in your wishlist' });
            } else {
                let updateWishlist = await productwishlistRepo.updateWishlist({ user_id: userId }, { $pull: { 'products': { product_id: req.body.product_id } } });
                if (!_.isEmpty(updateWishlist)) {
                    let user_wishlist = await Wishlist.findOne({ user_id: userId });
                    res.send({ status: 200, data: user_wishlist, message: 'Product is removed from your wishlist' });
                }
                else {
                    res.send({ status: 400, data: {}, message: 'Product could not be removed from wishlist' });
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new productWishlistController();