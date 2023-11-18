const express = require('express');
const emailSettingController = require('../controllers/email_setting.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();



module.exports = router;