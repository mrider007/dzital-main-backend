const express = require('express');
const MasterSettingController = require('../controllers/master_setting.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/admin/master/setting/add', request_param.any(), Authentication.AuthenticateAdmin, MasterSettingController.add);

module.exports = router;