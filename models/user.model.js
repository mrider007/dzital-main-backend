const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const UserSchema = new mongoose.Schema({
    name: { type: String, default: '', index: true, trim: true },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email cannot be Empty'],
        match: [/\S+@\S+\.\S+/, 'Email is Invalid'],
        index: true,
        trim: true,
        unique: true
    },
    image: { type: String, default: '' },
    gender: { type: String, index: true, trim: true },
    mobile: { type: String, default: '', index: true, trim: true },
    password: { type: String, index: true, trim: true },
    social_id: { type: String, default: '', index: true, trim: true },
    bio: { type: String, default: '' },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    address: { type: String, default: '' },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
    default_language: { type: String, default: '' },
    plan_id: { type: Schema.Types.ObjectId, ref: 'Membership_Plan', index: true },
    purchased_on: { type: Date, index: true, trim: true },
    status: { type: String, default: 'Active', index: true },
    wallet_amount: { type: Number, default: 0 },
    user_type: { type: String, index: true, enum: ['seller', 'user'], default: 'user' },
    commission_package: { type: Schema.Types.ObjectId, ref: 'Commission_Package', index: true },
    expired_on: { type: Date, index: true, trim: true },
    forget_pass_token: { type: String, index: true, trim: true, default: '' },
    register_type: { type: String, default: 'normal', enum: ['normal', 'google', 'facebook'] }
}, { timestamps: true, versionKey: false });

// generating a hash password
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('User', UserSchema);