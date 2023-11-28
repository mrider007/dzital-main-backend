const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const ProductSchema = new Schema({
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', trim: true },
    status: { type: String, index: true, trim: true }
}, { timestamps: true, versionKey: false });

ProductSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product', ProductSchema);