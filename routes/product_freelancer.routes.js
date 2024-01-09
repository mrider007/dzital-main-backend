const express = require('express');
const freelancerController = require('../controllers/product_freelancer.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/product/freelancer/details/:id', freelancerController.details);
router.post('/product/freelancer/add', request_param.any(), freelancerController.add);

module.exports = router;