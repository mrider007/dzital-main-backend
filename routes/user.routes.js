const express = require('express');
const UserController = require('../controllers/user.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const request_param = multer();

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
router.post('/register', request_param.any(), UserController.registration);
router.post('/login', request_param.any(), UserController.login);
router.post('/social-login', request_param.any(), UserController.socialSignup);
router.post('/profile/update', uploadFile.any(), Authentication.Authenticate, UserController.updateProfile);
router.post('/change-password', request_param.any(), Authentication.Authenticate, UserController.changePassword);
router.post('/social-login', request_param.any(), UserController.socialSignup);

module.exports = router;