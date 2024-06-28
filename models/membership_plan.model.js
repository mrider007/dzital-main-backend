const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const MembershipPlanSchema = new Schema({
    title: { type: String, index: true, trim: true },
    amount: { type: Number, default: 0, trim: true },
    status: { type: String, index: true, trim: true },
    no_of_months: { type: Number, default: 0, trim: true },
    benefit: { type: Array, default: [] },
    type: { type: String, index: true, enum: ['Premium_Membership', 'Zoom', 'Post_Boost'] }
}, { timestamps: true, versionKey: false });

MembershipPlanSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Membership_Plan', MembershipPlanSchema)