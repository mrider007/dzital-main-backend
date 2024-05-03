const mongoose = require('mongoose');
const Order = require('../models/order.model');
const orderRepo = require('../repositories/order.repository');

class orderController {
    constructor() { }

    async addOrder(req, res) {
        try {
            req.body.user_id = req.user._id;
            let orderData = await Order.create(req.body);
            if (!_.isEmpty(orderData) && orderData._id) {
                res.status(200).send({ status: 200, message: 'Order Placed Successfully' });
            } 
            else {
                res.status(400).send({ status: 400, message: 'Order could not be added' });
            }         
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

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

}

module.exports = new orderController();