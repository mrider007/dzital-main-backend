const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const AttributeValueSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', index: true },
    attribute_id: { type: Schema.Types.ObjectId, ref: 'Attribute', index: true },
    value: { type: String, index: true, trim: true }
}, { timestamps: true, versionKey: false });

AttributeValueSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Attribute_Value', AttributeValueSchema);