const express = require('express');
const attributeController = require('../controllers/attribute.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/attribute/add', request_param.any(), Authentication.AuthenticateAdmin, attributeController.attributeAdd);

module.exports = router;