const mongoose = require('mongoose');
const EmailSetting = require('../models/email_setting.model');
const emailsettingRepo = require('../repositories/email_setting.repository');

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

    async detail(req, res) {
        try {
            let email_setting_info = await EmailSetting.findOne();
            if (!_.isEmpty(email_setting_info) && email_setting_info._id) {
                res.send({ status: 200, data: email_setting_info, message: 'Email Setting detail has been fetched' });
            } else {
                res.send({ status: 400, data: {}, message: 'Email Setting not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async update(req, res) {
        try {
            let email_setting_id = new mongoose.Types.ObjectId(req.params.id);
            let emailSettingInfo = await EmailSetting.findOne({ _id: email_setting_id });
            if (!_.isEmpty(emailSettingInfo) && emailSettingInfo._id) {
                let email_setting_update = await emailsettingRepo.updateById(req.body, email_setting_id);
                if (!_.isEmpty(email_setting_update) && email_setting_update._id) {
                    res.send({ status: 200, data: email_setting_update, message: 'Email Setting has been updated successfully' });
                }
                else {
                    res.send({ status: 400, data: {}, message: 'Email Setting could not be updated' });
                }
            } else {
                res.send({ status: 400, data: {}, message: 'Email Setting not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new emailSettingController();