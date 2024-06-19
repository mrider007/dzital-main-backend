const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const Schema = mongoose.Schema;

const ProductPlanSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        index: true,
        required: [true, 'product required']
    },
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true, trim: true },
    stripe_product_id: {
        type: String,
    },
    stripe_price_id: {
        type: String,
    },
    plan_name: {
        type: String,
        trim: true,
        required: [true, 'Plan Name Required']
    },
    plan_price: {
        type: Number,
        required: [true, 'Plan Price Required']
    },
    plan_status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Inactive',
        required: [true, 'Plan Status Required']
    },
    plan_interval: {
        type: String,
        enum: ['month', 'year', 'week', 'day'],
        default: 'month',
        required: [true, 'Plan Interval Required']
    },
    plan_interval_count: {
        type: Number,
        default: 1,
        required: [true, 'Plan Interval Count Required']
    }
}, { timestamps: true, versionKey: false })

ProductPlanSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Product_Plan', ProductPlanSchema);