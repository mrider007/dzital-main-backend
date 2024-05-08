const express = require('express');
const router = express.Router()
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const JobApplyController = require('../controllers/job_apply.controller');
const fs = require('fs');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync('./uploads/cv')) {
            fs.mkdirSync('./uploads/cv');
        }
        callback(null, './uploads/cv');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '_' + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });

router.post('/job/application', uploadFile.single('file'), Authentication.Authenticate, JobApplyController.addApplication);

module.exports = router