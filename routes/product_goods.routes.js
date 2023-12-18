const express = require('express');
const ProductGoods = require('../controllers/product_goods.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/product/goods/list', request_param.any(), Authentication.Authenticate, ProductGoods.list);

module.exports = router;