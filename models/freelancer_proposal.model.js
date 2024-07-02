const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FreelancerProposalSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', trim: true, index: true },
    FreelancerProductId: { type: Schema.Types.ObjectId, ref: 'Product_Freelancer', index: true },
    name: { type: String, default: '', index: true },
    email: { type: String, default: '', lowercase: true },
    mobile: { type: String, default: '' },
    budget: { type: Number, default: 0 },
    message: { type: String, default: '' }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('freelancer_proposal', FreelancerProposalSchema);