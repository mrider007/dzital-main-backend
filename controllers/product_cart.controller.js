const Cart = require('../models/product_cart_model')
const Product = require('../models/product.model')
const ProductCartRepository = require('../repositories/product_cart.repository')

class productCartController {
    constructor() { }
    async addToCart(req, res) {
        try {
            if (req.user && req.user._id) {
                const {quantity, price, product_id} = req.body

                if(!quantity || !price || !product_id) {
                    return res.status(400).send({status: 400, message: "Inavalid data"})
                }

                const product = await Product.findById(product_id)
                if(!product || !product._id) {
                    return res.status(404).send({message: "product not found", status: 404})
                }

                let productCartAdd = await Cart.findOne({ user_id: req.user._id, 'items.product_id': { $in: product_id } });
                if (!_.isEmpty(productCartAdd) && productCartAdd._id) {
                    const index = productCartAdd.items.findIndex(item => item.product_id.toString() === product_id)
                    productCartAdd.items[index].quantity = productCartAdd.items[index].quantity + quantity
                    productCartAdd.items[index].total_price = price * productCartAdd.items[index].quantity
                    await productCartAdd.save()
                    return res.status(200).send({message: "Product quantity updated successfully", status: 200, data: productCartAdd})
                }
                else {
                    let cart_exist = await Cart.findOne({ user_id: req.user._id });
                    if (_.isEmpty(cart_exist)) {
                        let data = {user_id: req.user._id}
                        let arr = [];
                        arr.push({ "product_id": product_id, "quantity": quantity, "total_price": price * quantity})
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
                        let updateCart = await ProductCartRepository.updateCart({ user_id: req.user._id }, { $push: { 'items': { product_id: product_id, quantity: quantity, total_price: price * quantity } } });
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

     /** User cart */
     async userProductCart(req, res) {
        try {
            let userCartInfo = await ProductCartRepository.getUserCart(req);
            if (!_.isEmpty(userCartInfo)) {
                res.status(200).send({ status: 200, data: userCartInfo, message: 'User cart fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'You have no items in your cart' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new productCartController();