const EmailSetting = require('../models/email_setting.model');

class emailSettingController {
    constructor() { }

    async add(req, res) {
        try {
            let emailSettingSave = await EmailSetting.create(req.body);
            if (!_.isEmpty(emailSettingSave) && emailSettingSave._id) {
                res.send({ status: 200, data: emailSettingSave, message: 'Email Setting has been saved successfully' });
            } else {
                res.send({ status: 400, data: {}, message: 'Email Setting could not be saved' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const emailSettingInfo = await EmailSetting.findOne();
            if (!_.isEmpty(emailSettingInfo) && emailSettingInfo._id) {
                res.send({ status: 200, data: emailSettingInfo, message: 'Email Setting details has been fetched successfully' });
            } else {
                res.send({ status: 400, data: {}, message: 'Email Setting not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new emailSettingController();