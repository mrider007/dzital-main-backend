const express = require('express');
const attributevalueController = require('../controllers/attribute_value.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/product/attribute/value/add', request_param.any(), Authentication.AuthenticateAdmin, attributevalueController.productattributeValueAdd);

module.exports = router;