const express = require('express');
const adminActionController = require('../controllers/admin_action.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/admin/action/add', request_param.any(), Authentication.AuthenticateAdmin, adminActionController.add);
router.post('/admin/action/update/:id', request_param.any(), Authentication.AuthenticateAdmin, adminActionController.edit);
router.post('/admin/action/list', request_param.any(), Authentication.AuthenticateAdmin, adminActionController.list);

module.exports = router;