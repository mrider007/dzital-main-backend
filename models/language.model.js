const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const languageSchema = new Schema({
    country_name: { type: String, index: true, trim: true },
    country_code: { type: String, index: true, trim: true },
    language: { type: String, index: true, trim: true },
    is_default: { type: Boolean, default: false, enum: [true, false] }   
}, { timestamps: true, versionKey: false });

languageSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Language', languageSchema);