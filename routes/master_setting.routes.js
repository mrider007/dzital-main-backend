const express = require('express');
const MasterSettingController = require('../controllers/master_setting.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/admin/master/setting/details', Authentication.AuthenticateAdmin, MasterSettingController.details);
router.post('/admin/master/setting/add', request_param.any(), Authentication.AuthenticateAdmin, MasterSettingController.add);
router.post('/admin/master/setting/update/:id', request_param.any(), Authentication.AuthenticateAdmin, MasterSettingController.update);

module.exports = router;