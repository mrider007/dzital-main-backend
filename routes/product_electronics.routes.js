const express = require('express');
const ElectronicsController = require('../controllers/product_electronics.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/product/electronics/details/:id', Authentication.Authenticate, ElectronicsController.details);
router.post('/product/electronics/list', request_param.any(), Authentication.Authenticate, ElectronicsController.list);

module.exports = router;