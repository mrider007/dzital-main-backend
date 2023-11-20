const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentMethodSchema = new Schema({
    payment_gateway_name: { type: String, index: true, trim: true },
    status: { type: String, default: 'Test', enum: ['Live', 'Test', 'Disabled'] },
    keyvalue1: { type: String, default: '', trim: true },
    keyvalue2: { type: String, default: '', trim: true },
    keyvalue3: { type: String, default: '', trim: true },
    keyvalue4: { type: String, default: '', trim: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Payment_Method', PaymentMethodSchema);