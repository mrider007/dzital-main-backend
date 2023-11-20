const mongoose = require('mongoose');
const MasterSetting = require('../models/master_setting.model');

class MasterSettingController {
    constructor() { }

    async add(req, res) {
        try {
            let masterSettingSave = await MasterSetting.create(req.body);
            if (!_.isEmpty(masterSettingSave) && masterSettingSave._id) {
                res.send({ status: 200, data: masterSettingSave, message: 'Master Setting has been saved successfully' });
            } else {
                res.send({ status: 400, data: {}, message: 'Master Setting could not be saved' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            let master_setting = await MasterSetting.findOne();
            if (!_.isEmpty(master_setting) && master_setting._id) {
                res.send({ status: 200, data: master_setting, message: 'Master Setting details fetched successfully' });
            } else {
                res.send({ status: 400, data: {}, message: 'Master Setting not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new MasterSettingController();