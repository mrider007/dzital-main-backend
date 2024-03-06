const express = require('express');
const freelancerController = require('../controllers/product_freelancer.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const fs = require('fs');
const cloudinary = require('cloudinary');
const multer = require('multer');
const request_param = multer();

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

router.get('/product/freelancer/bulk-update', freelancerController.FreelancerProductsBulkUpdate);
router.get('/product/freelancer/details/:id', freelancerController.details);
router.post('/product/freelancer/add', uploadFile.any(), Authentication.Authenticate, freelancerController.add);
router.post('/product/freelancer/list', request_param.any(), freelancerController.list);

module.exports = router;