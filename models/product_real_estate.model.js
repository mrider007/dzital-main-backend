const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const ProductRealEstateSchema = new Schema({
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true, trim: true },
    per_sqmt_price: { type: Number, default: 0 },
    size: { type: Number },
    rent_per_month: { type: Number },
    floor: { type: Number },
    rooms: { type: Number },
    bathrooms: { type: Number },
    bedrooms: { type: Number },
    photo: { type: String, default: '', index: true },
    image_1: { type: String, default: '', index: true },
    image_2: { type: String, default: '', index: true },
    image_3: { type: String, default: '', index: true },
    balcony: { type: String, default: 'No', enum: ['Yes', 'No'] },
    terrace: { type: String, default: 'No', enum: ['Yes', 'No'] },
    property_type: { type: String, index: true, trim: true },
    parking_type: { type: String, index: true, trim: true },
    parking_fee: { type: Number },
    parking_slots: { type: Number, default: 0 },
    year_built: { type: Number },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', index: true },
    status: { type: String, index: true, trim: true }
}, { timestamps: true, versionKey: false });

ProductRealEstateSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Real_Estate', ProductRealEstateSchema);