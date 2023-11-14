const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MembershipPlanSchema = new Schema({
    title: { type: String, index: true, trim: true },
    amount: { type: Number, default: 0, trim: true },
    status: { type: String, index: true, trim: true },
    no_of_months: { type: Number, default: 0, trim: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Membership_Plan', MembershipPlanSchema)