const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new mongoose.Schema({
    client_id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true, trim: true },
    budget: { type: Number, trim: true },
    experience: { type: String, index: true, trim: true },
    skills: [{ type: String, index: true }],
    location: { type: String, index: true },
    role: { type: String, trim: true },
    role_category: { type: String, trim: true },
    joining_type: { type: String, trim: true },
    employment_type: { type: String, trim: true },
    department: { type: String, index: true },
    date: { type: Date, default: Date.now(), index: true },
    status: { type: String, default: 'Open', enum: ['Open', 'Ongoing', 'Completed'] }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Job', JobSchema);