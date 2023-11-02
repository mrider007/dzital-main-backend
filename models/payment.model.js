const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    planId: { type: Schema.Types.ObjectId, ref: 'Membership_Plan', index: true },
    amount: { type: Number, index: true, trim: true },
    payment_date: { type: Date, index: true },
    expired_on: { type: Date, index: true },
    card_holder_name: { type: String, index: true, trim: true },
    billing_address: { type: String, default: '', index: true, trim: true },
    zipcode: { type: String, index: true, trim: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Payment', PaymentSchema);