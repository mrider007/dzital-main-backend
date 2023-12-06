const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const countrySchema = new Schema({
    name: { type: String, index: true, trim: true },
    code: { type: String, trim: true },
    status: { type: String, default: 'Active', enum: ['Active', 'Inactive'] }
}, { versionKey: false });

countrySchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Country', countrySchema);