const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const ContactUsSchema = new Schema({
    name: { type: String, trim: true, index: true },
    email: {
        type: String,
        lowercase: true,
        required: [true, `Email can't be Empty`],
        match: [/\S+@\S+\.\S+/, 'Email is Invalid'],
        index: true,
        trim: true
    },
    mobile: { type: String, default: '' },
    message: { type: String, trim: true, index: true }
}, { timestamps: true, versionKey: false });

ContactUsSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Contact_Us', ContactUsSchema);