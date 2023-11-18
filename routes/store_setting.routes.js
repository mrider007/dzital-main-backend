const express = require('express');
const StoreSettingController = require('../controllers/store_setting.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/admin/store/setting/add', request_param.any(), Authentication.AuthenticateAdmin, StoreSettingController.storeSettingAdd);
router.get('/admin/store/setting/details', Authentication.AuthenticateAdmin, StoreSettingController.storeSettingDetails);

module.exports = router;