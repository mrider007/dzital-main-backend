const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const JobApplySchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    job_id: { type: Schema.Types.ObjectId, ref: 'Product_Job', index: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
    name: { type: String, trim: true },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email cannot be blank'],
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        index: true,
        trim: true,
    },
    mobile: { type: String, default: '', index: true, trim: true },
    cv: { type: String, trim: true, index: true }
}, { timestamps: true, versionKey: false });

JobApplySchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Job_Apply', JobApplySchema);