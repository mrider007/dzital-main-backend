const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserJobProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User Id is Required'], index: true },
    about: { type: String, default: '' },
    experience: [{
        company: { type: String, default: '', trim: true, index: true },
        start_date: { type: Date, default: Date.now() },
        end_date: { type: Date, default: Date.now() }
    }],
    year_of_experience: { type: Number, defualt: 0 },
    education: [{
        institute: { type: String, default: '', trim: true, index: true },
        start_date: { type: Date, default: Date.now() },
        end_date: { type: Date, default: Date.now() }
    }],
    skills: { type: Array, default: [] },
    languages: { type: Array, default: [] }
}, { versionKey: false });

module.exports = mongoose.model('User_Job_Profile', UserJobProfileSchema);