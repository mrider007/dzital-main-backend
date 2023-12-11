const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const productEducationSchema = new Schema({
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true, trim: true },
    price: { type: Number },
    product_type: { type: String, index: true },
    quantity: { type: Number, trim: true },
    photo: { type: String, default: '', index: true, trim: true },
    image_1: { type: String, default: '', index: true, trim: true },
    image_2: { type: String, default: '', index: true, trim: true },
    image_3: { type: String, default: '', index: true, trim: true },
    lat: { type: String, trim: true },
    long: { type: String, trim: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', index: true }
}, { timestamps: true, versionKey: false });

productEducationSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Education', productEducationSchema);