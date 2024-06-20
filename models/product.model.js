const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const ProductSchema = new Schema({
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true },
    userId: { type: Schema.Types.ObjectId, default: null, ref: 'User', trim: true },
    status: { type: String, default: 'Not Approved', enum: ['Approved', 'Not Approved'] },
    image: { type: String, default: '', trim: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true, trim: true },
    sub_category_id: { type: Schema.Types.ObjectId, ref: 'service_category', default: null, index: true },
    bid_now: { type: Boolean, default: false, enum: [true, false] },
    bid_start_price: { type: Number, default: 0 },
    bid_increament_value: { type: Number, default: 0 },
    bid_entry: { type: Number, default: 0 },
    bid_start_date: { type: Date },
    bid_end_date: { type: Date },
    product_price: { type: Number, default: 0 },
    purchase_type: { type: String, default: 'Free', enum: ['Free', 'Paid', 'Subscription'] }
}, { timestamps: true, versionKey: false });

ProductSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product', ProductSchema);