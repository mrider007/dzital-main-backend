const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const Schema = mongoose.Schema

const SubscriptionPaymentHistory = new Schema({
    plan_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product_Plan',
        index: true,
        required: [true, 'Plan Required']
    },
    payment_id: {
        type: String,
        required: [true, 'Payment Id Required']
    },
    stripe_subs_id: {
        type: String,
        required: [true, 'Stripe Subscription Id Required']
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: [true, 'User Id Required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount Required']
    },
    current_plan_start: {
        type: Date,
        required: [true, 'Current Plan Start Date Required']
    },
    current_plan_end: {
        type: Date,
        required: [true, 'Current Plan End Date Required']
    },
    payment_status: {
        type: String,
        enum: ['Success', 'Failed'],
        required: [true, 'Payment Status Required']
    }
}, { timestamps: true, versionKey: false })

SubscriptionPaymentHistory.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Subscription_Payment_History', SubscriptionPaymentHistory)