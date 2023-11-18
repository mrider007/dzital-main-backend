const StoreSetting = require('../models/store_setting.model');

const storeSetting = {

    updateById: async (data, id) => {
        try {
            let storeUpdate = await StoreSetting.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!storeUpdate) {
                return null;
            }
            return storeUpdate;
        } catch (e) {
            throw e;
        }
    },

    getById: async (id) => {
        try {
            let store_setting = await StoreSetting.findById(id).exec();
            if (!store_setting) {
                return null;
            }
            return store_setting;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = storeSetting;