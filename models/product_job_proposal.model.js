const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobProposalSchema = new Schema({
    proposal_text: { type: String, index: true },
    job_id: { type: Schema.Types.ObjectId, ref: 'Job', index: true },
    freelancer_id: { type: Schema.Types.ObjectId, ref: 'User', index: true, index: true },
    amount: { type: Number, index: true, trim: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Accepted', 'Rejected'] }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Product_Job_Proposal', JobProposalSchema);