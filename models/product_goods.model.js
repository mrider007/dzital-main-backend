const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const productGoodsSchema = new Schema({
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true, trim: true },
    price: { type: Number },
    quantity: { type: Number, default: 1 },
    product_type: { type: String, index: true, trim: true },
    photo: { type: String, default: '', index: true, trim: true },
    image_1: { type: String, default: '', index: true, trim: true },
    image_2: { type: String, default: '', index: true, trim: true },
    image_3: { type: String, default: '', index: true, trim: true },
    brand: { type: String, trim: true },
    lat: { type: String, trim: true },
    long: { type: String, trim: true },
    user_id: { type: Schema.Types.ObjectId, default: null, ref: 'User', index: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    sub_category_id: { type: Schema.Types.ObjectId, ref: 'service_category', default: null, index: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', index: true }
}, { timestamps: true, versionKey: false });

productGoodsSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Goods', productGoodsSchema);