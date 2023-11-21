const express = require('express');
const StoreSettingController = require('../controllers/store_setting.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const request_param = multer();
const cloudinary = require('cloudinary');

cloudinary.v2.config({
    "cloud_name": 'dslcqudfq',
    "api_key": '865887567124381',
    "api_secret": 'aW3AA2C1pCIAhY1B1xGut7XBMFo',
});

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync("./uploads/store_setting")) {
            fs.mkdirSync("./uploads/store_setting");
        }

        callback(null, "./uploads/store_setting");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });

router.get('/admin/store/setting/details', Authentication.AuthenticateAdmin, StoreSettingController.storeSettingDetails);
router.get('/store/setting/detail', Authentication.Authenticate, StoreSettingController.details);
router.post('/admin/store/setting/add', request_param.any(), Authentication.AuthenticateAdmin, StoreSettingController.storeSettingAdd);
router.post('/admin/store/setting/update/:id', uploadFile.any(), Authentication.AuthenticateAdmin, StoreSettingController.storeSettingUpdate);

module.exports = router;