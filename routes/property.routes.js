const express = require('express');
const propertyController = require('../controllers/property.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();
const router = express.Router();

router.post('/property/add', request_param.any(), Authentication.Authenticate, propertyController.add);

module.exports = router;