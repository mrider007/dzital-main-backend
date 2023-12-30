const mongoose = require('mongoose');
const PaymentMethod = require('../models/payment_method.model');
const paymentMethodRepo = require('../repositories/payment_method.repository');

class paymentMethodController {
    constructor() { }

    async add(req, res) {
        try {
            const paymentMethodSave = await PaymentMethod.create(req.body);
            if (!_.isEmpty(paymentMethodSave) && paymentMethodSave._id) {
                res.status(200).send({ status: 200, data: paymentMethodSave, message: 'Payment Method has been saved successfully' });
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Payment Method could not be saved' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            let paymentMethodInfo = await PaymentMethod.findOne();
            if (!_.isEmpty(paymentMethodInfo) && paymentMethodInfo._id) {
                res.status(200).send({ status: 200, data: paymentMethodInfo, message: 'Payment Method details fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Payment Method not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async update(req, res) {
        try {
            let payment_method_id = new mongoose.Types.ObjectId(req.params.id);
            let paymentMethodInfo = await PaymentMethod.findOne({ _id: payment_method_id });
            if (!_.isEmpty(paymentMethodInfo) && paymentMethodInfo._id) {
                let paymentMethodUpdate = await paymentMethodRepo.updateById(req.body, payment_method_id);
                if (!_.isEmpty(paymentMethodUpdate) && paymentMethodUpdate._id) {
                    res.status(200).send({ status: 200, data: paymentMethodUpdate, message: 'Payment Method has been updated successfully' });
                } else {
                    res.status(400).send({ status: 400, data: {}, message: 'Payment Method could not be updated' });
                }
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Payment Method not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new paymentMethodController();