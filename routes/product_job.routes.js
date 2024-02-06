const express = require('express');
const JobController = require('../controllers/product_job.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/job/delete/:id', request_param.any(), JobController.jobDelete);
router.get('/job/details/:id', request_param.any(), JobController.jobDetails);
router.post('/job/post', request_param.any(), JobController.jobPost);
router.post('/job/list', request_param.any(), JobController.jobList);
router.post('/job/update/:id', request_param.any(), JobController.jobUpdate);
router.post('/job/change-status/:id', request_param.any(), JobController.changeStatus);
router.post('/product/job/list', request_param.any(), JobController.productJobList);

module.exports = router;