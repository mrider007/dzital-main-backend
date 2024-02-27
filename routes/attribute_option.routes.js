const express = require('express');
const AttributeOptionController = require('../controllers/attribute_option.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/attribute/option/add', request_param.any(), Authentication.AuthenticateAdmin, AttributeOptionController.attributeOptionAdd);

module.exports = router;