const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const CMSSchema = new Schema({
    title: { type: String, index: true, trim: true },
    slug: { type: String, default: '', index: true },
    description: { type: String, index: true, trim: true },
    status: { type: String, default: 'Active', enum: ['Active', 'Inactive'] }
}, { timestamps: true, versionKey: false });

CMSSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('CMS', CMSSchema);