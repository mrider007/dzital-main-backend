const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const JobSchema = new mongoose.Schema({
    client_id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true, trim: true },
    experience: { type: String, index: true, trim: true },
    skills: [{ type: String, index: true }],
    location: { type: String, index: true },
    role: { type: String, trim: true },
    role_category: { type: String, trim: true },
    joining: { type: String },
    employment_type: { type: String, trim: true },
    industry_type: { type: String, trim: true },
    department: { type: String, index: true },
    budget: { type: Number, trim: true },
    date: { type: Date, index: true },
    status: { type: String, default: 'Open', enum: ['Open', 'Ongoing', 'Completed'] }
}, { timestamps: true, versionKey: false });

JobSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Job', JobSchema);