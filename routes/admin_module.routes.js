const express = require('express');
const adminModuleController = require('../controllers/admin_module.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/admin/module/add', request_param.any(), Authentication.AuthenticateAdmin, adminModuleController.add);

module.exports = router;