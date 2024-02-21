const express = require('express');
const JobController = require('../controllers/product_job.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const request_param = multer();
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

router.get('/product/job/bulk-update', JobController.JobProductsBulkUpdate);
router.get('/job/delete/:id', request_param.any(), JobController.jobDelete);
router.get('/job/details/:id', request_param.any(), JobController.jobDetails);
router.post('/job/post', request_param.any(), JobController.jobPost);
router.post('/job/list', request_param.any(), JobController.jobList);
router.post('/job/update/:id', uploadFile.any(), JobController.jobUpdate);
router.post('/job/change-status/:id', request_param.any(), JobController.changeStatus);
router.post('/product/job/list', request_param.any(), JobController.productJobList);

module.exports = router;