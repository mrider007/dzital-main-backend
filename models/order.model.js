const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const orderSchema = new Schema({
    order_id: { type: String, default: '' },
    items: [
        {
            product_id: { type: Schema.Types.ObjectId, ref: 'Product', index: true },
            category_id: { type: Schema.Types.ObjectId, ref: 'service_category' },
            quantity: { type: Number, default: 1, },
            total_price: { type: Number, default: 0, }
        }
    ],
    total_amount: { type: Number, default: 0 },
    payment_mode: { type: String, default: '', trim: true },
    status: { type: String, default: '' },
    discount_amount: { type: Number, default: 0 },
    order_date: { type: Date, default: Date.now() },
    promocode_id: { type: Schema.Types.ObjectId, ref: 'Promo_code', default: null },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true }
}, { versionKey: false });

orderSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Order', orderSchema);