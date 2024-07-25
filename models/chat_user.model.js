const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const chatUserSchema = new mongoose.Schema({
    user1_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User 1 Id Required'] },
    user2_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User 2 Id Required'] },
}, { timestamps: true, versionKey: false });

chatUserSchema.plugin(mongooseAggregatePaginate)

module.exports = mongoose.model('Chat_User', chatUserSchema);