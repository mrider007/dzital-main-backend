const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    name: { type: String, index: true },
    per_sqmt_price: { type: Number, default: 0 },
    size_sqmt: { type: Number },
    rent_per_month: { type: Number }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Property', PropertySchema);