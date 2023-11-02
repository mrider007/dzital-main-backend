const express = require('express');
const PaymentController = require('../controllers/payment.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();



module.exports = router;