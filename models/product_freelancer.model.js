const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const FreelancerSchema = new mongoose.Schema({
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true, trim: true },
    experience: { type: String, index: true, trim: true },
    skills: [{ type: String, index: true }],
    location: { type: String, index: true },
    budget: { type: Number },
    department: { type: String, index: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    // job_type: { type: Schema.Types.ObjectId, ref: 'Job_Type', index: true },
    status: { type: String, default: 'Active', index: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true }
}, { timestamps: true, versionKey: false });

FreelancerSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Freelancer', FreelancerSchema);