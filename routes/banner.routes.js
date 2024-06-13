const express = require('express');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary');
const bannerController = require('../controllers/banner.controller');

cloudinary.v2.config({
    "cloud_name": 'dslcqudfq',
    "api_key": '865887567124381',
    "api_secret": 'aW3AA2C1pCIAhY1B1xGut7XBMFo',
});

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync('./uploads/banner')) {
            fs.mkdirSync('./uploads/banner');
        }
        callback(null, './uploads/banner');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '_' + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });

router.get('/banner/banner-list', Authentication.AuthenticateAdmin, bannerController.getBanners)
router.post('/banner/add', uploadFile.any(), Authentication.AuthenticateAdmin, bannerController.newBanner)
router.put('/banner/update/:id', Authentication.AuthenticateAdmin, bannerController.updateBanner)
router.delete('/banner/delete/:id', Authentication.AuthenticateAdmin, bannerController.deleteBanner)

module.exports = router;