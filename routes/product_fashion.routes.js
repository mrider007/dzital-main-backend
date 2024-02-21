const express = require('express');
const productFashionController = require('../controllers/product_fashion.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/product/fashion/bulk-update', productFashionController.FashionProductsBulkUpdate);
router.post('/product/fashion/list', request_param.any(), productFashionController.list);
router.get('/product/fashion/details/:id', productFashionController.details);

module.exports = router;