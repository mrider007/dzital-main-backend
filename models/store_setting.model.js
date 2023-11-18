const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSettingSchema = new Schema({
    store_name: { type: String, index: true, trim: true },
    logo: { type: String, default: '' },
    favicon_logo: { type: String, default: '' },
    primary_mobile: { type: String, default: '' },
    primary_email: { type: String, default: '' },
    version: { type: String, index: true, trim: true },
    status: { type: String, default: 'Maintenance Mode', enum: ['Maintenance Mode', 'Live'] },
    default_language: { type: String, default: '' },
    default_currency: { type: String, default: '' },
    system_time_zone: { type: String, default: '', trim: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Store_Setting', StoreSettingSchema);