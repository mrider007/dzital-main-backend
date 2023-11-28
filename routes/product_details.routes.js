const express = require('express');
const ProductDetailsController = require('../controllers/product_detail.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();



module.exports = router;