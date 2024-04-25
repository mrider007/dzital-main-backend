const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const ProductCartSchema = new Schema({
    items: [
        {
            product_id: { type: Schema.Types.ObjectId, ref: 'Product', index: true },
            quantity: { type: Number, default: 1, },
            total_price: { type: Number, default: 0, }
        }
    ],
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true }
}, { timestamps: true, versionKey: false });

ProductCartSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Cart', ProductCartSchema);