const express = require('express');
const emailSettingController = require('../controllers/email_setting.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/admin/email/setting/details', Authentication.AuthenticateAdmin, emailSettingController.details);
router.post('/admin/email/setting/add', request_param.any(), Authentication.AuthenticateAdmin, emailSettingController.add);

module.exports = router;