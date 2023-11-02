const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const PromocodeSchema = new Schema({
    promo_code: { type: String, index: true, trim: true },
    message: { type: String, index: true, trim: true },
    no_of_users: { type: Number, trim: true },
    start_date: { type: Date, index: true, trim: true },
    end_date: { type: Date, index: true, trim: true },
    discount_type: { type: String, index: true, trim: true },
    discount: { type: Number, trim: true },
    status: { type: String, index: true, trim: true }
}, { timestamps: true, versionKey: false });

PromocodeSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Promocode', PromocodeSchema);