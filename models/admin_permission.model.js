const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const AdminPermissionSchema = new Schema({
    name: { type: String, index: true, trim: true },
    slug: { type: String, index: true, trim: true },
    module_id: { type: Schema.Types.ObjectId, ref: 'Admin_Module', index: true },
    action_id: { type: Schema.Types.ObjectId, ref: 'Admin_Action', index: true }
}, { timestamps: true, versionKey: false });

AdminPermissionSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('Admin_Permission', AdminPermissionSchema);