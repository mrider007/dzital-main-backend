const express = require('express');
const propertyController = require('../controllers/product_real_estate.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();
const router = express.Router();

router.get('/product/real-estate/bulk-update', propertyController.RealEstateProductsBulkUpdate);
router.get('/property/details/:id', request_param.any(), propertyController.details);
router.post('/property/add', request_param.any(), propertyController.add);
router.post('/property/list', request_param.any(), propertyController.list);

module.exports = router;