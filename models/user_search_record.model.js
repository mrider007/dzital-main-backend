const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const userSearchRecordSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    search_text: { type: String, default: '', trim: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'service_category', index: true },
    address: { type: String, default: '' },
    country: { type: String, default: '' },
    date: { type: Date, default: Date.now() }
}, { versionKey: false });

userSearchRecordSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('User_Search_Record', userSearchRecordSchema);