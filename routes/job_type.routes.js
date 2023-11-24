const express = require('express');
const JobTypeController = require('../controllers/job_type.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/admin/job/type/add', request_param.any(), Authentication.AuthenticateAdmin, JobTypeController.add);

module.exports = router;