const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const AdminSchema = new Schema({
    name: { type: String, index: true, trim: true },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email cannot be blank'],
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        trim: true
    },
    image: { type: String, default: '' },
    mobile: { type: String, default: '', index: true, trim: true },
    social_id: { type: String, default: '', index: true, trim: true },
    register_type: { type: String, default: 'normal', enum: ['normal', 'facebook', 'google'] },
    password: { type: String, index: true, trim: true }
}, { timestamps: true, versionKey: false });

// generating a hash
AdminSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('Admin', AdminSchema);