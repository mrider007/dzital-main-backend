const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, index: true, trim: true },
    description: { type: String, index: true, trim: true },
    price: { type: Number, trim: true },
    product_type: { type: String, index: true, trim: true },
    image: { type: String, default: '', index: true, trim: true },
    brand: { type: String, index: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    quantity: { type: Number, trim: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Product', ProductSchema);