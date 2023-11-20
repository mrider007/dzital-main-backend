const MasterSetting = require('../models/master_setting.model');

const MasterSettingRepositpory = {

    updateById: async (data, id) => {
        try {
            let mastersettingUpdate = await MasterSetting.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!mastersettingUpdate) {
                return null;
            }
            return mastersettingUpdate;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = MasterSettingRepositpory;