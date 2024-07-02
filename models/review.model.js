const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', index: true },
    attachments: { type: Array, default: [] },
    review: { type: String, index: true, trim: true },
    rating: { type: Number, index: true, trim: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Review', ReviewSchema);