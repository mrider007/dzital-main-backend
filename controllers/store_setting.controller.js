const mongoose = require('mongoose');
const StoreSetting = require('../models/store_setting.model');

class StoreSettingController {
    constructor() { }

    async storeSettingAdd(req, res) {
        try {
            let storeSettingSave = await StoreSetting.create(req.body);
            if (!_.isEmpty(storeSettingSave) && storeSettingSave._id) {
                res.send({ status: 200, data: storeSettingSave, message: 'Store Setting data saved successfully' });
            }
            else {
                res.send({ status: 400, data: {}, message: 'Store Setting data could not be saved' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async storeSettingDetails(req, res) {
        try {
            let storeSetting = await StoreSetting.findOne();
            if (!_.isEmpty(storeSetting) && storeSetting._id) {
                res.send({ status: 200, data: storeSetting, message: 'Store Setting has been fetched successfully' });
            } else {
                res.send({ status: 400, data: {}, message: 'Store Setting not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: 'Store Setting could not be updated' });
        }
    };

}

module.exports = new StoreSettingController();