const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const CurrencySchema = new Schema({
    currency_name: { type: String, index: true, trim: true },
    code: { type: String, index: true, trim: true },
    exchange_rate: { type: Number, default: 1 },
    is_default: { type: Boolean, default: false, enum: [true, false] },
    country: { type: String, index: true, trim: true },
    language: { type: String, index: true, trim: true }
}, { versionKey: false });

CurrencySchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Currency', CurrencySchema);