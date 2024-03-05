const express = require('express');
const ElectronicsController = require('../controllers/product_electronics.controller');
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

router.get('/product/electronics/bulk-update', ElectronicsController.ElectronicsProductsBulkUpdate);
router.get('/product/electronics/details/:id', ElectronicsController.details);
router.post('/product/electronics/list', request_param.any(), ElectronicsController.list);
router.post('/product/electronics/add', uploadFile.any(), Authentication.Authenticate, ElectronicsController.ElectronicsProductAdd);

module.exports = router;