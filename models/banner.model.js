const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const BannerSchema = new Schema({
    category_id: { type: Schema.Types.ObjectId, ref: 'service_category', index: true, trim: true, required: [true, 'Category is Required'] },
    title: { type: String, index: true, trim: true },
    title2: { type: String, trim: true },
    description: { type: String, trim: true },
    primary_color: { type: String, trim: true },
    secondary_color: { type: String, trim: true },
    image: { type: String, default: '', trim: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', trim: true },
}, { timestamps: true, versionKey: false });

BannerSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Banner', BannerSchema);