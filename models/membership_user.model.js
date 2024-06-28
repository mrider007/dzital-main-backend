const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const Schema = mongoose.Schema;

const Membership_User_Schema = new Schema({
    membership_id: {
        type: Schema.Types.ObjectId,
        ref: 'Membership_Plan',
        index: true,
        required: [true, 'Membership is Required']
    },
    payment_id: {
        type: String,
        required: [true, 'Payment Id Required']
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: [true, 'User Required']
    },
    membership_status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: [true, 'Membership Status Required']
    },
    membership_end_date: {
        type: Date,
        required: [true, 'Membership End Date Required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount Required']
    },
    payment_status: {
        type: String,
        enum: ['Success', 'Failed'],
        required: [true, 'Payment Status Required']
    },
    type: { type: String, index: true, enum: ['Premium_Membership','Zoom','Post_Boost']}
}, { timestamps: true, versionKey: false })

Membership_User_Schema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Membership_User', Membership_User_Schema)