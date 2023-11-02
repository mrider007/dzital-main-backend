const express = require('express');
const ReviewController = require('../controllers/review.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/review/details/:id', request_param.any(), Authentication.Authenticate, ReviewController.reviewDetails);
router.get('/review/delete/:id', request_param.any(), Authentication.Authenticate, ReviewController.reviewDelete);
router.post('/review/job', request_param.any(), Authentication.Authenticate, ReviewController.reviewJob);
router.post('/review/list', request_param.any(), Authentication.Authenticate, ReviewController.jobReviewList);
router.post('/review/update/:id', request_param.any(), Authentication.Authenticate, ReviewController.reviewUpdate);

module.exports = router;