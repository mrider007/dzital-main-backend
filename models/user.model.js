const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const UserSchema = new mongoose.Schema({
    name: { type: String, default: '', index: true, trim: true },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email cannot be blank'],
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        index: true,
        trim: true
    },
    image: { type: String, default: '' },
    gender: { type: String, index: true, trim: true },
    mobile: { type: String, default: '', index: true, trim: true },
    password: { type: String, index: true, trim: true },
    social_id: { type: String, default: '', index: true, trim: true },
    address: { type: String, default: '' },
    lat: { type: String, trim: true },
    long: { type: String, trim: true },
    plan_id: { type: Schema.Types.ObjectId, ref: 'Membership_Plan', index: true },
    member_type: { type: String, index: true, trim: true },
    organization_name: { type: String, index: true, trim: true },
    official_email_id: { type: String, index: true, trim: true },
    purchased_on: { type: Date, index: true, trim: true },
    expired_on: { type: Date, index: true, trim: true },
    register_type: { type: String, default: 'normal', enum: ['normal', 'google', 'facebook'] }
}, { timestamps: true, versionKey: false });

// generating a hash password
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('User', UserSchema);