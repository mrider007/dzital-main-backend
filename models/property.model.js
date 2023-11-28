const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const PropertySchema = new Schema({
    name: { type: String, index: true, trim: true },
    description: { type: String, index: true, trim: true },
    per_sqmt_price: { type: Number, default: 0 },
    size: { type: Number },
    rent_per_month: { type: Number },
    floor: { type: Number },
    rooms: { type: Number },
    bathrooms: { type: Number },
    bedrooms: { type: Number },
    balcony: { type: String, default: 'No', enum: ['Yes', 'No'] },
    terrace: { type: String, default: 'No', enum: ['Yes', 'No'] },
    property_type: { type: String, index: true, trim: true },
    parking_type: { type: String, index: true, trim: true },
    parking_fee: { type: Number },
    parking_slots: { type: Number, default: 0 },
    year_built: { type: Number },
    added_by: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    status: { type: String, index: true, trim: true }
}, { timestamps: true, versionKey: false });

PropertySchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Property', PropertySchema);