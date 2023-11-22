const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const ProductWishlistSchema = new Schema({
    products: [{ product_id: { type: Schema.Types.ObjectId, ref: 'Product', index: true } }],
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true }
}, { timestamps: true, versionKey: false });

ProductWishlistSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Wishlist', ProductWishlistSchema);