const express = require('express');
const freelancerController = require('../controllers/product_freelancer.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/admin/product/freelancer/add', request_param.any(), Authentication.AuthenticateAdmin, freelancerController.add);

module.exports = router;