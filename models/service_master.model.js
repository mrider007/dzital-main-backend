const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    parentId: { type: Schema.Types.ObjectId, ref: 'service_category', default: null, index: true },
    title: { type: String, index: true },
    order: { type: Number, index: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('service_category', ServiceSchema);