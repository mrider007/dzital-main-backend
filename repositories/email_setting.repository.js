const EmailSetting = require('../models/email_setting.model');

const EmailSettingRepository = {

    updateById: async (data, id) => {
        try {
            let emailsettingUpdate = await EmailSetting.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!emailsettingUpdate) {
                return null;
            }
            return emailsettingUpdate;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = EmailSettingRepository;