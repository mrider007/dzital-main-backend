const express = require('express');
const router = express.Router();
const ContactToSupplierController = require('../controllers/contact_to_supplier.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();

router.post('/contact-to-supplier', request_param.any(), Authentication.Authenticate, ContactToSupplierController.contactSupplierProductInquiry);

module.exports = router;