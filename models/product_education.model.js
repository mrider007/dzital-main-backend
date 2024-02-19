const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const productEducationSchema = new Schema({
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true, trim: true },
    image: { type: String, default: '', index: true, trim: true },
    address: { type: String, default: '', index: true, trim: true },
    user_id: { type: Schema.Types.ObjectId, default: null, ref: 'User', index: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', index: true }
}, { timestamps: true, versionKey: false });

productEducationSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Education', productEducationSchema);