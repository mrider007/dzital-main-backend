const express = require('express');
const ReviewController = require('../controllers/review.controller');
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
        if (!fs.existsSync("./uploads/review")) {
            fs.mkdirSync("./uploads/review");
        }

        callback(null, "./uploads/review");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });

router.get('/review/details/:id', request_param.any(), Authentication.Authenticate, ReviewController.reviewDetails);
router.get('/product/review/delete/:id', request_param.any(), Authentication.Authenticate, ReviewController.reviewDelete);
router.get('/reviews/bulk-update', ReviewController.ReviewsBulkUpdate);
router.get('/admin/review/delete/:id', request_param.any(), Authentication.AuthenticateAdmin, ReviewController.adminReviewDelete);
router.post('/product/review', uploadFile.any(), Authentication.Authenticate, ReviewController.productReviewAdd);
router.post('/product/review/list', request_param.any(), ReviewController.productReviewList);
router.post('/review/list', request_param.any(), Authentication.AuthenticateAdmin, ReviewController.adminProductReviewList);
router.post('/review/update/:id', request_param.any(), Authentication.Authenticate, ReviewController.reviewUpdate);
router.post('/review/status/update/:id', request_param.any(), Authentication.AuthenticateAdmin, ReviewController.reviewStatusUpdate);

module.exports = router;