const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const Schema = mongoose.Schema;

const Product_Payment_Schema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        index: true,
        required: [true, 'Product Required']
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
    amount: {
        type: Number,
        required: [true, 'Amount Required']
    },
    payment_status: {
        type: String,
        enum: ['Success', 'Failed'],
        required: [true, 'Payment Status Required']
    }
}, { timestamps: true, versionKey: false })

Product_Payment_Schema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Payment', Product_Payment_Schema)