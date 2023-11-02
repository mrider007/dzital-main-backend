const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new mongoose.Schema({
    client_id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    title: { type: String, index: true, trim: true },
    description: { type: String, index: true, trim: true },
    budget: { type: Number, trim: true },
    date: { type: Date, index: true },
    status: { type: String, default: 'Open', enum: ['Open', 'Ongoing', 'Completed'] }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Job', JobSchema);