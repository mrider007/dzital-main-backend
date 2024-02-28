const express = require('express');
const AttributeOptionController = require('../controllers/attribute_option.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/user/attribute/option/list', request_param.any(), Authentication.Authenticate, AttributeOptionController.userAttributeOptionList);
router.post('/attribute/option/add', request_param.any(), Authentication.AuthenticateAdmin, AttributeOptionController.attributeOptionAdd);
router.post('/attribute/option/list', request_param.any(), Authentication.AuthenticateAdmin, AttributeOptionController.attributeOptionList);

module.exports = router;