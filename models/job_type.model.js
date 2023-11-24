const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const JobTypeSchema = new Schema({
    title: { type: String, index: true, trim: true },
    status: { type: String, default: 'Active', enum: ['Active', 'Inactive'] }
}, { timestamps: true, versionKey: false });

JobTypeSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Job_Type', JobTypeSchema);