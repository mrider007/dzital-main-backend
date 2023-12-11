const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const AdminActionSchema = new Schema({
    name: { type: String, index: true, trim: true },
    slug: { type: String, index: true, trim: true }
}, { timestamps: true, versionKey: false });

AdminActionSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Admin_Action', AdminActionSchema);