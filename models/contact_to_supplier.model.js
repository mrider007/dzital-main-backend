const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const ContactToSupplierSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', trim: true, index: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', trim: true, index: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', trim: true, index: true },
    quantity: { type: Number, default: 1 },
    requirements_details: { type: String, default: '' }
}, { timestamps: true, versionKey: false });

ContactToSupplierSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('contact_to_supplier', ContactToSupplierSchema);