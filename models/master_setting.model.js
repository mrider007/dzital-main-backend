const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MasterSettingSchema = new Schema({
    currency: { type: String, index: true, trim: true },
    language: { type: String, index: true, trim: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Master_Setting', MasterSettingSchema);