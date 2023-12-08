const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const ProductJobTypeSchema = new Schema({
    title: { type: String, index: true, trim: true },
    status: { type: String, default: 'Active', enum: ['Active', 'Inactive'] }
}, { timestamps: true, versionKey: false });

ProductJobTypeSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Job_Type', ProductJobTypeSchema);