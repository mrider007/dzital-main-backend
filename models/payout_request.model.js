const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const Schema = mongoose.Schema;

const PayoutRequestSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    amount: { type: Number, index: true, trim: true },
    status: { type: String, enum: ['Requested', 'Approved', 'Not Approved'], default: 'Requested' },
    remarks: { type: String, default: '' }
}, { timestamps: true, versionKey: false });

PayoutRequestSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Payout_Request', PayoutRequestSchema);