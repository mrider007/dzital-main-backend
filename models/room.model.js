const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const RoomSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', index: true }],
    room_type: { type: String, enum: ['audio', 'video'], default: 'audio' },
    status: { type: String, enum: ['ongoing', 'connected', 'disconnected'], default: 'ongoing' },
    channelName: { type: String },
    token: { type: String }
}, { timestamps: true, versionKey: false });

RoomSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Room', RoomSchema);