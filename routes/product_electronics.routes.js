const express = require('express');
const ProductElectronicsController = require('../controllers/product_electronics.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();



module.exports = router;