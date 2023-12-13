const Module = require('../models/admin_module.model');

const adminModuleRepository = {

    updateById: async (data, id) => {
        try {
            let moduleUpdate = await Module.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!moduleUpdate) {
                return null;
            }
            return moduleUpdate;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = adminModuleRepository;