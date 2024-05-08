const mongoose = require('mongoose')
const Cart = require('../models/product_cart.model')
const Product = require('../models/product.model')
const ProductCartRepository = require('../repositories/product_cart.repository')
const electronicsRepo = require('../repositories/product_electronics.repository');
const jobRepo = require('../repositories/product_job.repository');
const propertyRepo = require('../repositories/product_real_estate.repository');
const fashionRepo = require('../repositories/product_fashion.repository');
const goodsRepo = require('../repositories/product_goods.repository');
const freelancerRepo = require('../repositories/product_freelancer.repository');
const educationRepo = require('../repositories/product_education.repository');
const Category = require('../models/service_category.model');

class productCartController {
    constructor() { }
    async addToCart(req, res) {
        try {
            if (req.user && req.user._id) {
                const { quantity, price, product_id } = req.body

                if (!price || !product_id || price === '') {
                    return res.status(400).send({ status: 400, message: "Invalid Data" });
                }

                const actQuantity = quantity || 1

                const product = await Product.findById(product_id)
                if (!product || !product._id) {
                    return res.status(404).send({ status: 404, message: "Product Not Found" })
                }

                if (product.userId === req.user._id) return res.status(400).send({ message: 'can not add own product into cart', status: 400 })
                    
                let productCartAdd = await Cart.findOne({ user_id: req.user._id, 'items.product_id': { $in: product_id } });
                if (!_.isEmpty(productCartAdd) && productCartAdd._id) {
                    const index = productCartAdd.items.findIndex(item => item.product_id.toString() === product_id)
                    productCartAdd.items[index].quantity = productCartAdd.items[index].quantity + actQuantity
                    productCartAdd.items[index].total_price = price * productCartAdd.items[index].quantity
                    await productCartAdd.save()
                    return res.status(200).send({ message: "Product quantity updated successfully", status: 200, data: productCartAdd })
                }
                else {
                    let cart_exist = await Cart.findOne({ user_id: req.user._id });
                    if (_.isEmpty(cart_exist)) {
                        let data = { user_id: req.user._id }
                        let arr = [];
                        arr.push({ "product_id": product_id, "quantity": actQuantity, "total_price": price * actQuantity })
                        data.items = arr;
                        let cartAdd = await Cart.create(data);
                        if (!_.isEmpty(cartAdd) && cartAdd._id) {
                            res.status(200).send({ status: 200, data: cartAdd, message: 'Product is added to your cart' });
                        }
                        else {
                            res.status(201).send({ status: 201, data: {}, message: 'Product could not be added to cart' });
                        }
                    }
                    else {
                        let updateCart = await ProductCartRepository.updateCart({ user_id: req.user._id }, { $push: { 'items': { product_id: product_id, quantity: actQuantity, total_price: price * actQuantity } } });
                        if (!_.isEmpty(updateCart)) {
                            let userCart = await Cart.findOne({ user_id: req.user._id });
                            res.status(200).send({ status: 200, data: userCart, message: 'Product is added to your cart' });
                        } else {
                            res.status(201).send({ status: 201, data: {}, message: 'Product could not be added to cart' });
                        }
                    }
                }
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'User not found' });
            }
        } catch (e) {
            return res.status(500).send({ status: 500, message: e.message });
        }
    };

    async productCartDetails(req, res) {
        try {
            const productInfo = await Product.findOne({ _id: req.params.id });
            if (!_.isEmpty(productInfo) && productInfo._id) {
                let categoryInfo = await Category.findOne({ _id: productInfo.category_id });
                if (categoryInfo.title === 'Real Estate') {
                    let propertyDetails = await propertyRepo.getPropertyDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(propertyDetails) && propertyDetails._id) {
                        res.status(200).send({ status: 200, data: propertyDetails, message: 'Property details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Electronics') {
                    let electronicsDetails = await electronicsRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(electronicsDetails) && electronicsDetails._id) {
                        res.status(200).send({ status: 200, data: electronicsDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Jobs') {
                    let jobDetails = await jobRepo.getJobDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(jobDetails) && jobDetails._id) {
                        res.status(200).send({ status: 200, data: jobDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Fashion & Beauty') {
                    let fashionDetails = await fashionRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(fashionDetails) && fashionDetails._id) {
                        res.status(200).send({ status: 200, data: fashionDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Goods of all kinds') {
                    let goodsDetails = await goodsRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(goodsDetails) && goodsDetails._id) {
                        res.status(200).send({ status: 200, data: goodsDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Freelancer') {
                    let freelancerDetails = await freelancerRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(freelancerDetails) && freelancerDetails._id) {
                        res.status(200).send({ status: 200, data: freelancerDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Lessons & Courses') {
                    let lessonDetails = await educationRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(lessonDetails) && lessonDetails._id) {
                        res.status(200).send({ status: 200, data: lessonDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** User cart */
    async userProductCart(req, res) {
        try {
            let userCartInfo = await ProductCartRepository.getUserCart(req);
            if (!_.isEmpty(userCartInfo)) {
                res.status(200).send({ status: 200, data: userCartInfo, message: 'User cart fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: {}, message: 'You have no items in your cart' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async removeProductCart(req, res) {
        try {
            let userId = req.user._id;
            let cart_exist = await Cart.findOne({ user_id: userId, 'items.product_id': { $in: new mongoose.Types.ObjectId(req.body.product_id) } });
            if (_.isEmpty(cart_exist)) {
                res.status(400).send({ status: 400, data: {}, message: 'Product is not in your cart' });
            } else {
                let updateCart = await ProductCartRepository.updateCart({ user_id: userId }, { $pull: { 'items': { product_id: req.body.product_id } } });
                if (!_.isEmpty(updateCart)) {
                    let user_cart = await Cart.findOne({ user_id: userId });
                    res.status(200).send({ status: 200, data: user_cart, message: 'Product is removed from your cart' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Product could not be removed from cart' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    }

    async updateQuantity(req, res) {
        try {
            let userId = req.user._id;
            if (!req.body.product_id) {
                return res.status(404).send({ status: 404, message: "product not found" });
            }
            let cart_exist = await Cart.findOne({ user_id: userId, 'items.product_id': { $in: new mongoose.Types.ObjectId(req.body.product_id) } });
            if (_.isEmpty(cart_exist)) {
                res.status(400).send({ status: 400, data: {}, message: 'Product is not in your cart' });
            } else {
                if (req.body.quantity === 0) {
                    let updateCart = await ProductCartRepository.updateCart({ user_id: userId }, { $pull: { 'items': { product_id: req.body.product_id } } });
                    if (!_.isEmpty(updateCart)) {
                        let user_cart = await Cart.findOne({ user_id: userId });
                        res.status(200).send({ status: 200, data: user_cart, message: 'Product is removed from your cart' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be removed from cart' });
                    }
                } else {
                    const index = cart_exist.items.findIndex(item => item.product_id.toString() === req.body.product_id)
                    const price = cart_exist.items[index].total_price / cart_exist.items[index].quantity

                    cart_exist.items[index].quantity = req.body.quantity
                    cart_exist.items[index].total_price = req.body.quantity * price

                    let updateCart = await ProductCartRepository.updateCart({ user_id: userId, 'items.product_id': { $in: new mongoose.Types.ObjectId(req.body.product_id) } }, { items: cart_exist.items });
                    if (!_.isEmpty(updateCart)) {
                        let user_cart = await Cart.findOne({ user_id: userId });
                        res.status(200).send({ status: 200, data: user_cart, message: 'Quantity updated for that product in cart' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'quantity could not be updated' });
                    }
                }
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async clearCart(req, res) {
        try {
            const userId = req.user._id
            let updateCart = await ProductCartRepository.updateCart({ user_id: userId }, { 'items': [] });
            if (!_.isEmpty(updateCart)) {
                let user_cart = await Cart.findOne({ user_id: userId });
                res.status(200).send({ status: 200, data: user_cart, message: 'all items removed from the card' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Items can not be removed from the cart' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: 500, message: error.message });
        }
    }

}

module.exports = new productCartController();