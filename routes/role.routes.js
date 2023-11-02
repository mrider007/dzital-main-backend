const express = require('express');
const roleController = require('../controllers/role.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/role/details/:id', Authentication.AuthenticateAdmin, roleController.roleDetails);
router.get('/role/delete/:id', Authentication.AuthenticateAdmin, roleController.roleDelete);
router.post('/role/add', request_param.any(), Authentication.AuthenticateAdmin, roleController.roleAdd);
router.post('/role/update/:id', request_param.any(), Authentication.AuthenticateAdmin, roleController.roleUpdate);
router.post('/role/list', request_param.any(), Authentication.AuthenticateAdmin, roleController.roleList);

module.exports = router;