const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromocodeSchema = new Schema({
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    title: { type: String, trim: true },
    type: { type: String, default: 'Percentage', enum: ['Percentage', 'Flat'] },
    value: { type: Number },
    status: { type: String, default: 'Active', trim: true },
    expiry_date: { type: Date, index: true, trim: true },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Promo_code', PromocodeSchema);