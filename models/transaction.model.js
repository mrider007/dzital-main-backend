const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const TransactionSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User Id is Required'], index: true },
    opening_amount: { type: Number, required: [true, 'Opening Amount is Required'] },
    credit: { type: Number, default: 0 },
    debit: { type: Number, default: 0 },
    closing_amount: { type: Number, required: [true, 'Closing Amount is Required'] },
}, { timestamps: true, versionKey: false });

TransactionSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Transaction', TransactionSchema);