const express = require('express');
const StoreSettingController = require('../controllers/store_setting.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/admin/store/setting/details', Authentication.AuthenticateAdmin, StoreSettingController.storeSettingDetails);
router.post('/admin/store/setting/add', request_param.any(), Authentication.AuthenticateAdmin, StoreSettingController.storeSettingAdd);
router.post('/admin/store/setting/update/:id', request_param.any(), Authentication.AuthenticateAdmin, StoreSettingController.storeSettingUpdate);

module.exports = router;