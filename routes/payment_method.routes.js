const express = require('express');
const paymentMethodController = require('../controllers/payment_method.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/admin/payment/method/add', request_param.any(), Authentication.AuthenticateAdmin, paymentMethodController.add);

module.exports = router;