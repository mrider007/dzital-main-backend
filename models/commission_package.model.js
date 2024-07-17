const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const CommissionPackageSchma = new Schema({
    title: { type: String, index: true, trim: true },
    commission_percentage: { type: Number, index: true, trim: true },
    type: { type: String, index: true, trim: true, enum: ["Default", "Manual"] },
}, { timestamps: true, versionKey: false });

CommissionPackageSchma.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Commission_Package', CommissionPackageSchma);