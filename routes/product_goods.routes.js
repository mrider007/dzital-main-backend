const express = require('express');
const ProductGoods = require('../controllers/product_goods.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();
const fs = require('fs');
const cloudinary = require('cloudinary');

cloudinary.v2.config({
    "cloud_name": 'dslcqudfq',
    "api_key": '865887567124381',
    "api_secret": 'aW3AA2C1pCIAhY1B1xGut7XBMFo',
});

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync('./uploads/product')) {
            fs.mkdirSync('./uploads/product');
        }
        callback(null, './uploads/product');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '_' + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });

router.get('/product/goods/bulk-update', ProductGoods.GoodsProductsBulkUpdate);
router.get('/product/goods/details/:id', ProductGoods.details);
router.post('/product/goods/add', uploadFile.any(), Authentication.Authenticate, ProductGoods.GoodsProductCreate);
router.post('/product/goods/list', request_param.any(), ProductGoods.list);

module.exports = router;