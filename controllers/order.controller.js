const mongoose = require('mongoose');
const Order = require('../models/order.model');

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

}

module.exports = new orderController();