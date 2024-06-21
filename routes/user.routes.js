const express = require('express');
const UserController = require('../controllers/user.controller');
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
        if (!fs.existsSync("./uploads/user")) {
            fs.mkdirSync("./uploads/user");
        }

        callback(null, "./uploads/user");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });

router.get('/profile/details', request_param.any(), Authentication.Authenticate, UserController.profileDetails);
router.get('/logout', request_param.any(), Authentication.Authenticate, UserController.logout);
router.get('/user/list', Authentication.AuthenticateAdmin, UserController.userList);
router.get('/user/chat-token/agora', UserController.fetchAgoraToken);
router.post('/register', request_param.any(), UserController.registration);
router.post('/login', request_param.any(), UserController.login);
router.post('/social-login', request_param.any(), UserController.socialSignup);
router.post('/profile/update', uploadFile.any(), Authentication.Authenticate, UserController.updateProfile);
router.post('/change-password', request_param.any(), Authentication.Authenticate, UserController.changePassword);
router.post('/social-login', request_param.any(), UserController.socialSignup);
router.post('/user/bio/address/update', Authentication.Authenticate, UserController.userBioAddressUpdate);
router.post('/user/forget-password', request_param.any(), UserController.forgetPassword);
router.post('/chat/user/token/create', Authentication.Authenticate, UserController.createAgoraChatToken);
router.post('/seller/profile/details', UserController.sellerProfileDetails);

module.exports = router;