const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const orderRepo = require('../repositories/order.repository');

class orderController {
    constructor() { }

    /** User Place Order */
    async addOrder(req, res) {
        try {
            req.body.user_id = req.user._id;
            const orderId = 'ORD' + Math.floor(Math.random() * 100000).toString();
            req.body.order_id = orderId;

            const Items = req.body.items;
            for (let i = 0; i < Items.length; i++) {
                let product_info = await Product.findOne({ _id: Items[i].product_id });
                Items[i].category_id = product_info.category_id;
            }
            req.body.final_amount = req.body.total_amount - req.body.discount_amount;
            let orderData = await Order.create(req.body);
            if (!_.isEmpty(orderData) && orderData._id) {
                res.status(200).send({ status: 200, orderData, message: 'Order Placed Successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Order could not be added' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    /** User My Orders List */
    async List(req, res) {
        try {
            let userOrders = await orderRepo.getUserOrders(req);
            if (!_.isEmpty(userOrders)) {
                res.status(200).send({ status: 200, data: userOrders, message: 'User Orders List' });
            }
            else {
                res.status(201).send({ status: 201, message: 'You Have No Orders' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    /** Seller Order Received List */
    async sellerOrderReceivedList(req, res) {
        try {
            let sellerOrders = await orderRepo.getSellerOrders(req);
            if (!_.isEmpty(sellerOrders)) {
                res.status(200).send({ status: 200, data: sellerOrders, message: 'Seller Orders Received List' });
            }
            else {
                res.status(201).send({ status: 201, message: 'No Orders Found' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

}

module.exports = new orderController();