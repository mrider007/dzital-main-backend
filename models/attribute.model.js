const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const AttributeSchema = new Schema({
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    sub_category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    is_master_filter: { type: Schema.Types.Boolean, default: false },
    is_sub_filter: { type: Schema.Types.Boolean, default: false },    
    attribute: { type: String, trim: true }
}, { timestamps: true, versionKey: false });

AttributeSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Attribute', AttributeSchema);