const express = require('express');
const OrderController = require('../controllers/order.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/order-add', Authentication.Authenticate, OrderController.addOrder);

module.exports = router;