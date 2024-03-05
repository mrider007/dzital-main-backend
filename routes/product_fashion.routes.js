const express = require('express');
const productFashionController = require('../controllers/product_fashion.controller');
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

router.get('/product/fashion/bulk-update', productFashionController.FashionProductsBulkUpdate);
router.get('/product/fashion/details/:id', productFashionController.details);
router.post('/product/fashion/list', request_param.any(), productFashionController.list);
router.post('/product/fashion/add', uploadFile.any(), Authentication.Authenticate, productFashionController.FashionProductCreate);

module.exports = router;