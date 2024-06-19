const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const Schema = mongoose.Schema

const Meeting_Schema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        index: true,
        required: [true, 'Product Id Required']
    },
    meeting_agenda: {
        type: String,
    },
    meeting_start_url: {
        type: String,
        required: [true, 'Meeting Start Url Required']
    },
    meeting_join_url: {
        type: String,
        required: [true, 'Meeting Join Url Required']
    },
    meeting_password: {
        type: String,
        required: [true, 'Meeting Password Required']
    },
    meetingAt: {
        type: Date,
        required: [true, 'Meeting Date Required']
    },
    duration: {
        type: Number,
        required: [true, 'Meeting Duration Required']
    }
}, { timestamps: true, versionKey: false })

Meeting_Schema.plugin(mongooseAggregatePaginate)

module.exports = mongoose.model('Meeting', Meeting_Schema)