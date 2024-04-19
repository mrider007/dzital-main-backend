const express = require('express');
const propertyController = require('../controllers/product_real_estate.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();
const router = express.Router();
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

router.get('/product/real-estate/bulk-update', propertyController.RealEstateProductsBulkUpdate);
router.get('/property/details/:id', request_param.any(), propertyController.details);
router.post('/property/add', uploadFile.any(), Authentication.Authenticate, propertyController.add);
router.post('/property/list', request_param.any(), propertyController.productRealEstateList);

module.exports = router;