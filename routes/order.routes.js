const express = require('express');
const OrderController = require('../controllers/order.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/order-add', request_param.any(), Authentication.Authenticate, OrderController.addOrder);
router.post('/order-list', Authentication.Authenticate, OrderController.List);

module.exports = router;