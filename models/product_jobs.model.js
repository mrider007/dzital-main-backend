const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const JobSchema = new mongoose.Schema({
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true, trim: true },
    experience: { type: String, index: true, trim: true },
    skills: [{ type: String, index: true }],
    location: { type: String, index: true },
    employment_type: { type: String, trim: true },
    industry_type: { type: String, trim: true },
    department: { type: String, index: true },
    image: { type: String, default: '', trim: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    job_type: { type: Schema.Types.ObjectId, ref: 'Job_Type', index: true },
    job_status: { type: String, default: 'Open', index: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', index: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    date: { type: Date, index: true }
}, { timestamps: true, versionKey: false });

JobSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Job', JobSchema);