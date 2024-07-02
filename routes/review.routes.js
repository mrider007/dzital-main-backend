const express = require('express');
const ReviewController = require('../controllers/review.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/review/details/:id', request_param.any(), Authentication.AuthenticateAdmin, ReviewController.reviewDetails);
router.get('/review/delete/:id', request_param.any(), Authentication.AuthenticateAdmin, ReviewController.reviewDelete);
router.post('/product/review', request_param.any(), Authentication.Authenticate, ReviewController.productReviewAdd);
router.post('/product/review/list', request_param.any(), Authentication.Authenticate, ReviewController.productReviewList);
router.post('/review/update/:id', request_param.any(), Authentication.AuthenticateAdmin, ReviewController.reviewUpdate);

module.exports = router;