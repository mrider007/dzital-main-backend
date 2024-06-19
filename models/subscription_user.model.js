const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const Schema = mongoose.Schema;

const SubscriptionUserSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: [true, 'User Required']
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        index: true,
        required: [true, 'Product Required']
    },
    payment_id: {
        type: String,
        default: null,
    },
    purchase_mode: {
        type: String,
        enum: ['Free', 'Paid', "Subscription"],
        required: [true, 'Purchase Mode Required']
    },
    current_plan_start: {
        type: Date,
    },
    current_plan_end: {
        type: Date,
    },
    amount: {
        type: Number
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: [true, 'status required']
    },
    isEnded: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, versionKey: false });

SubscriptionUserSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Subscription_User', SubscriptionUserSchema);