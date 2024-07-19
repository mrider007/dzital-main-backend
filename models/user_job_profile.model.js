const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserJobProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User Id is Required'], index: true },
    cover_photo: { type: String, default: '' },
    about: { type: String, default: '' },
    skills: { type: Array, default: [] },
    experience: { type: Array, default: [] },
    year_of_experience: { type: Number, defualt: 0 },
    education: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    languages: { type: Array, default: [] }
}, { versionKey: false });

module.exports = mongoose.model('User_Job_Profile', UserJobProfileSchema);