const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const AttributeOptionSchema = new Schema({
    attribute_id: { type: Schema.Types.ObjectId, ref: 'Attribute', index: true },
    option: { type: String, index: true, trim: true }
}, { timestamps: true, versionKey: false });

AttributeOptionSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Attribute_Option', AttributeOptionSchema);