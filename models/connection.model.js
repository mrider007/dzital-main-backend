const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const UserConnectionSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User', index: true, default: null },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', index: true, default: null },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Accepted', 'Rejected'] }
}, { timestamps: true, versionKey: false });

UserConnectionSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Connection', UserConnectionSchema);