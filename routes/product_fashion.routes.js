const express = require('express');
const productFashionController = require('../controllers/product_fashion.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/product/fashion/list', request_param.any(), productFashionController.list);

module.exports = router;