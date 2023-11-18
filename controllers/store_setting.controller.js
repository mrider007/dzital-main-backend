const mongoose = require('mongoose');
const StoreSetting = require('../models/store_setting.model');
const storeSettingRepo = require('../repositories/store_setting.repository');

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
            res.send({ status: 500, message: e.message });
        }
    };

    async storeSettingUpdate(req, res) {
        try {         
            let store_setting_id = new mongoose.Types.ObjectId(req.params.id);
            let store_setting = await storeSettingRepo.getById(store_setting_id);
            if (!_.isEmpty(store_setting) && store_setting._id) {
                let store_setting_update = await storeSettingRepo.updateById(req.body, store_setting_id);
                if (!_.isEmpty(store_setting_update) && store_setting_update._id) {
                    res.send({ status: 200, data: store_setting_update, message: 'Store Setting has been updated successfully' });                    
                }
                else {
                    res.send({ status: 400, data: {}, message: 'Store Setting could not be updated' });
                }
            } else {
                res.send({ status: 400, message: 'Store Setting not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new StoreSettingController();