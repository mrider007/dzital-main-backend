const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', index: true },
    review: { type: String, index: true, trim: true },
    rating: { type: Number, index: true, trim: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Review', ReviewSchema);