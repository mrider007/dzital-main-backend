const express = require('express');
const productFashionController = require('../controllers/product_fashion.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();



module.exports = router;