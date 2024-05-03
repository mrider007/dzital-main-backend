const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const orderSchema = new Schema({
    items: [
        {
            product_id: { type: Schema.Types.ObjectId, ref: 'Product', index: true },
            quantity: { type: Number, default: 1, },
            total_price: { type: Number, default: 0, }
        }
    ],
    total_amount: { type: Number, default: 0 },
    status: { type: String, default: 'Success', enum: ['Success', 'Failed'] },
    order_date: { type: Date, default: Date.now() },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true }
}, { versionKey: false });

orderSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Order', orderSchema);