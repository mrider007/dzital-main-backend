const express = require('express');
const adminController = require('../controllers/admin.controller');
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
        if (!fs.existsSync('./uploads/admin')) {
            fs.mkdirSync('./uploads/admin');
        }
        callback(null, './uploads/admin');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '_' + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });

router.get('/admin/details', request_param.any(), Authentication.AuthenticateAdmin, adminController.details);
router.get('/admin/logout', request_param.any(), Authentication.AuthenticateAdmin, adminController.logout);
router.get('/admin/user/delete/:id', Authentication.AuthenticateAdmin, adminController.userDelete);
router.get('/admin/user/profile/:id', Authentication.AuthenticateAdmin, adminController.userDetails);
router.post('/admin/list', request_param.any(), Authentication.AuthenticateAdmin, adminController.adminList);
router.post('/admin/register', request_param.any(), adminController.adminRegister);
router.post('/admin/login', request_param.any(), adminController.adminLogin);
router.post('/admin/profile/update', uploadFile.any(), Authentication.AuthenticateAdmin, adminController.updateProfile);
router.post('/admin/change-password', request_param.any(), Authentication.AuthenticateAdmin, adminController.changePassword);
router.post('/admin/users/list', request_param.any(), Authentication.AuthenticateAdmin, adminController.userList);
router.post('/admin/user/add', uploadFile.any(), Authentication.AuthenticateAdmin, adminController.userAdd);
router.post('/admin/user/update/:id', uploadFile.any(), Authentication.AuthenticateAdmin, adminController.userUpdate);
router.post('/admin/premium/users/list', request_param.any(), Authentication.AuthenticateAdmin, adminController.premiumUsersList);
router.post('/admin/active/users/list', request_param.any(), Authentication.AuthenticateAdmin, adminController.activeUsersList);
router.post('/admin/inactive/users/list', request_param.any(), Authentication.AuthenticateAdmin, adminController.deactivatedUsersList);
router.post('/admin/non-premium/users/list', request_param.any(), Authentication.AuthenticateAdmin, adminController.nonPremiumUsersList);
router.post('/admin/add', request_param.any(), Authentication.AuthenticateAdmin, adminController.adminAdd);

module.exports = router;