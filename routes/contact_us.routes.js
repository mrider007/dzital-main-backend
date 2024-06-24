const express = require('express');
const router = express.Router();
const ContactUsController = require('../controllers/contact_us.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();

router.post('/contact-us/message', request_param.any(), Authentication.Authenticate, ContactUsController.contactUsMessageSave);


module.exports = router;