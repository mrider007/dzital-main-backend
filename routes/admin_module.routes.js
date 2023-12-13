const express = require('express');
const adminModuleController = require('../controllers/admin_module.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/admin/module/details/:id', Authentication.AuthenticateAdmin, adminModuleController.details);
router.post('/admin/module/add', request_param.any(), Authentication.AuthenticateAdmin, adminModuleController.add);
router.post('/admin/module/update/:id', request_param.any(), Authentication.AuthenticateAdmin, adminModuleController.edit);

module.exports = router;