const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const RoleSchema = new Schema({
    role: { type: String, index: true, trim: true },
    isDeleted: { type: Boolean, default: false, enum: [true, false] }
}, { timestamps: true, versionKey: false });

RoleSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Role', RoleSchema);