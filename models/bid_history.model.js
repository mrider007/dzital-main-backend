const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const BidHistorySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', trim: true, index: true },    
    productId: { type: Schema.Types.ObjectId, ref: 'Product', trim: true, index: true },
    bid_amount: { type: Number, default: 0 }
}, { timestamps: true, versionKey: false });

BidHistorySchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('bid_history', BidHistorySchema);