const express = require('express');
const adminController = require('../controllers/admin.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const request_param = multer();

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
router.post('/admin/register', request_param.any(), adminController.adminRegister);
router.post('/admin/login', request_param.any(), adminController.adminLogin);
router.post('/admin/profile/update/:id', uploadFile.any(), Authentication.AuthenticateAdmin, adminController.updateProfile);
router.post('/admin/change-password', request_param.any(), Authentication.AuthenticateAdmin, adminController.changePassword);
router.post('/admin/users/list', request_param.any(), Authentication.AuthenticateAdmin, adminController.userList);

module.exports = router;