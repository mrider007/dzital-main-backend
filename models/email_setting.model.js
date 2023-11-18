const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSettingSchema = new Schema({
    from_email: { type: String, index: true },
    password: { type: String, index: true },
    smtp_host: { type: String, index: true },
    smtp_port: { type: String, index: true },
    email_content_type: { type: String, default: 'HTML', enum: ['HTML', 'Text'] },
    smtp_encryption: { type: String, index: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Email_Setting', EmailSettingSchema);