const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const PaymentDueSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: [true, 'User is Required'] },
    total_amount: { type: Number, required: [true, 'Total Amount is Required'] },
    payable_amount: { type: Number, required: [true, 'Payable Amount is Required'] },
    platform_fees: { type: Number, required: [true, 'Platform Fees is Required'] },
    last_invoice: { type: Date, default: new Date() },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Paid', 'Cancelled'] }
}, { timestamps: true, versionKey: false });

PaymentDueSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Payment_Due', PaymentDueSchema);