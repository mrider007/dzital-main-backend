const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const JobSchema = new mongoose.Schema({
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true },
    image: { type: String, default: '', trim: true },
    company_logo: { type: String, default: '' },
    user_id: { type: Schema.Types.ObjectId, default: null, ref: 'User', index: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', index: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    sub_category_id: { type: Schema.Types.ObjectId, ref: 'service_category', default: null, index: true }
}, { timestamps: true, versionKey: false });

JobSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Job', JobSchema);