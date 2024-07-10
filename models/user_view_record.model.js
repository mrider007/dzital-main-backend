const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const userProductViewRecordSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', index: true },
    date: { type: Date, default: Date.now() }
}, { versionKey: false });

userProductViewRecordSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('User_Product_View_Record', userProductViewRecordSchema);