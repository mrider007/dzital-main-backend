const mongoose = require('mongoose');
const Wishlist = require('../models/product_wishlist.model');
const productwishlistRepo = require('../repositories/product_wishlist.repository');
const electronicsRepo = require('../repositories/product_electronics.repository');
const jobRepo = require('../repositories/product_job.repository');
const propertyRepo = require('../repositories/product_real_estate.repository');
const fashionRepo = require('../repositories/product_fashion.repository');
const goodsRepo = require('../repositories/product_goods.repository');
const freelancerRepo = require('../repositories/product_freelancer.repository');
const educationRepo = require('../repositories/product_education.repository');
const Product = require('../models/product.model');
const Category = require('../models/service_category.model');
const User = require('../models/user.model');

class productWishlistController {
    constructor() { }

    /** Product Add to wishlist */
    async addToWishlist(req, res) {
        try {
            let user = await User.findOne({ _id: req.user._id });
            if (!_.isEmpty(user) && user._id) {
                /***  user can not add his product   ***/
                const product = await Product.findOne({ _id: req.body.product_id })
                if (_.isEmpty(product) || !product._id) {
                    return res.status(404).send({ status: 404, message: 'Product Not Found' });
                }
                if (product.userId === user._id) {
                    return res.status(400).send({ status: 400, message: `You can't add own product into wishlist` });
                }

                let productwishlistAdd = await Wishlist.findOne({ user_id: req.user._id, 'products.product_id': { $in: req.body.product_id } });
                if (!_.isEmpty(productwishlistAdd) && productwishlistAdd._id) {
                    res.status(200).send({ status: 200, data: {}, message: 'Product already present in your wishlist' });
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
                            res.status(200).send({ status: 200, data: wishlistAdd, message: 'Product added to your wishlist' });
                        }
                        else {
                            res.status(201).send({ status: 201, data: {}, message: 'Product could not be added to wishlist' });
                        }
                    }
                    else {
                        let updateWishlist = await productwishlistRepo.updateWishlist({ user_id: req.user._id }, { $push: { 'products': { product_id: req.body.product_id } } });
                        if (!_.isEmpty(updateWishlist)) {
                            let userwishlist = await Wishlist.findOne({ user_id: req.user._id });
                            res.status(200).send({ status: 200, data: userwishlist, message: 'Product added to your wishlist' });
                        }
                    }
                }
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'User Not Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** User Wishlist */
    async userProductWishlist(req, res) {
        try {
            let userwishlistInfo = await productwishlistRepo.getUserWishlist(req);
            if (!_.isEmpty(userwishlistInfo)) {
                res.status(200).send({ status: 200, data: userwishlistInfo, message: 'User Wishlist fetched Successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: {}, message: 'You have no product in your wishlist' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async productWishlistDetails(req, res) {
        try {
            const productInfo = await Product.findOne({ _id: req.params.id });
            if (!_.isEmpty(productInfo) && productInfo._id) {
                let categoryInfo = await Category.findOne({ _id: productInfo.category_id });
                if (categoryInfo.title === 'Real Estate') {
                    let propertyDetails = await propertyRepo.getPropertyDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(propertyDetails) && propertyDetails._id) {
                        res.status(200).send({ status: 200, data: propertyDetails, message: 'Real Estate Details has been fetched Successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product Not Found' });
                    }
                }
                else if (categoryInfo.title === 'Electronics') {
                    let electronicsDetails = await electronicsRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(electronicsDetails) && electronicsDetails._id) {
                        res.status(200).send({ status: 200, data: electronicsDetails, message: 'Electronics Product Details has been fetched Successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product Not Found' });
                    }
                }
                else if (categoryInfo.title === 'Jobs') {
                    let jobDetails = await jobRepo.getJobDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(jobDetails) && jobDetails._id) {
                        res.status(200).send({ status: 200, data: jobDetails, message: 'Job Details has been fetched Successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product Not Found' });
                    }
                }
                else if (categoryInfo.title === 'Fashion & Beauty') {
                    let fashionDetails = await fashionRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(fashionDetails) && fashionDetails._id) {
                        res.status(200).send({ status: 200, data: fashionDetails, message: 'Fashion Product details has been fetched Successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product Not Found' });
                    }
                }
                else if (categoryInfo.title === 'Goods of all kinds') {
                    let goodsDetails = await goodsRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(goodsDetails) && goodsDetails._id) {
                        res.status(200).send({ status: 200, data: goodsDetails, message: 'Goods of All Kinds Product Details has been fetched Successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product Not Found' });
                    }
                }
                else if (categoryInfo.title === 'Freelancer') {
                    let freelancerDetails = await freelancerRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(freelancerDetails) && freelancerDetails._id) {
                        res.status(200).send({ status: 200, data: freelancerDetails, message: 'Freelancer Product Details has been fetched Successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product Not Found' });
                    }
                }
                else if (categoryInfo.title === 'Lessons & Courses') {
                    let lessonDetails = await educationRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(lessonDetails) && lessonDetails._id) {
                        res.status(200).send({ status: 200, data: lessonDetails, message: 'Lesson & Course Product details has been fetched Successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product Not Found' });
                    }
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Product Remove From Wishlist */
    async removeFromWishlist(req, res) {
        try {
            let userId = req.user._id;
            let wishlist_exist = await Wishlist.findOne({ user_id: userId, 'products.product_id': { $in: new mongoose.Types.ObjectId(req.body.product_id) } });
            if (_.isEmpty(wishlist_exist)) {
                res.status(400).send({ status: 400, data: {}, message: 'Product is not in your wishlist' });
            } else {
                let updateWishlist = await productwishlistRepo.updateWishlist({ user_id: userId }, { $pull: { 'products': { product_id: req.body.product_id } } });
                if (!_.isEmpty(updateWishlist)) {
                    let user_wishlist = await Wishlist.findOne({ user_id: userId });
                    res.status(200).send({ status: 200, data: user_wishlist, message: 'Product Removed From Your Wishlist' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Product could not be removed from wishlist' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new productWishlistController();