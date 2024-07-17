const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserJobProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User Id is Required'], index: true },
    cover_photo: { type: String, default: '' },
    name: { type: String, default: '' },
    bio: { type: String, default: '' },
    about: { type: String, default: '' }
});

module.exports = mongoose.model('User_Job_Profile', UserJobProfileSchema);