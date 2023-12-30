const PaymentMethod = require('../models/payment_method.model');

const PaymentMethodRepository = {

    updateById: async (data, id) => {
        try {
            let paymentmethodUpdate = await PaymentMethod.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!paymentmethodUpdate) {
                return null;
            }
            return paymentmethodUpdate;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = PaymentMethodRepository;