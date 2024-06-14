const mongoose = require('mongoose');

const ZoomTokenSchema = new mongoose.Schema({
    access_token: { type: String, index: true, trim: true, required: [true, `Access Token can't be Empty`] },
    refresh_token: { type: String, index: true, trim: true, required: [true, `Refresh Token can't be Empty`] },
    exp: { type: Number }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Zoom_Token', ZoomTokenSchema);