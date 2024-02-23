const express = require('express');
const attributeController = require('../controllers/attribute.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/admin/attribute/detail/:id', Authentication.AuthenticateAdmin, attributeController.attributeDetails);
router.post('/attribute/add', request_param.any(), Authentication.AuthenticateAdmin, attributeController.attributeAdd);
router.post('/admin/attribute/list', request_param.any(), Authentication.AuthenticateAdmin, attributeController.attributeList);
router.post('/admin/attribute/update/:id', request_param.any(), Authentication.AuthenticateAdmin, attributeController.update);

module.exports = router;