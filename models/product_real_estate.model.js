const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const ProductRealEstateSchema = new Schema({
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true },
    photo: { type: String, default: '', index: true },
    image_1: { type: String, default: '', index: true },
    image_2: { type: String, default: '', index: true },
    image_3: { type: String, default: '', index: true },
    user_id: { type: Schema.Types.ObjectId, default: null, ref: 'User', index: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    sub_category_id: { type: Schema.Types.ObjectId, ref: 'service_category', default: null, index: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', index: true },
    status: { type: String, index: true, trim: true }
}, { timestamps: true, versionKey: false });

ProductRealEstateSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Real_Estate', ProductRealEstateSchema);