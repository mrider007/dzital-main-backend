const express = require('express');
const productEducationController = require('../controllers/product_education.controller');
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

router.get('/product/lesson-course/detail/:id', productEducationController.lessonCourseDetails);
router.post('/product/lesson-courses/list', request_param.any(), productEducationController.lessonCoursesList);
router.post('/product/lesson-course/update/:id', uploadFile.any(), productEducationController.lessonCourseUpdate);

module.exports = router;