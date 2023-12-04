const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
    currency: { type: String, index: true, trim: true }    
}, { versionKey: false });

module.exports = mongoose.model('Currency', CurrencySchema);