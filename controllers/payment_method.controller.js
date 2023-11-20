const PaymentMethod = require('../models/payment_method.model');

class paymentMethodController {
    constructor() { }

    async add(req, res) {
        try {
            const paymentMethodSave = await PaymentMethod.create(req.body);
            if (!_.isEmpty(paymentMethodSave) && paymentMethodSave._id) {
                res.send({ status: 200, data: paymentMethodSave, message: 'Payment Method has been saved successfully' });
            } else {
                res.send({ status: 400, data: {}, message: 'Payment Method could not be saved' });
            }            
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new paymentMethodController();