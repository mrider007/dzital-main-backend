const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const FAQSchema = new Schema({
    question: { type: String, index: true, trim: true },
    answer: { type: String, index: true, trim: true }
}, { timestamps: true, versionKey: false });

FAQSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('FAQ', FAQSchema);