const express = require('express');
const permissionController = require('../controllers/admin_permission.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();
const router = express.Router();

router.post('/admin-permission/add', request_param.any(), Authentication.AuthenticateAdmin, permissionController.add);
router.post('/admin-permission/list', request_param.any(), Authentication.AuthenticateAdmin, permissionController.list);

module.exports = router;