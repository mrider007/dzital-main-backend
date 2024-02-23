const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const AttributeSchema = new Schema({
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    sub_category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    attribute: { type: String, trim: true }
}, { timestamps: true, versionKey: false });

AttributeSchema.plugin(mongooseAggregatePaginate);

module.exports - mongoose.model('attribute', AttributeSchema);