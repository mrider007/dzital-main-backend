const express = require('express');
const serviceController = require('../controllers/service_master.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/service/list', serviceController.serviceList);
router.get('/service/sub-category/delete/:id', Authentication.AuthenticateAdmin, serviceController.serviceDelete);
router.get('/service/sub-category/details/:id', Authentication.AuthenticateAdmin, serviceController.serviceDetails);
router.post('/service/sub-category/list', request_param.any(), serviceController.SubCategoryList);
router.post('/admin/service/sub-category/list', request_param.any(), Authentication.AuthenticateAdmin, serviceController.adminSubCategoryList);
router.post('/service/sub-category/add', request_param.any(), Authentication.AuthenticateAdmin, serviceController.serviceAdd);
router.post('/service/sub-category/update/:id', request_param.any(), Authentication.AuthenticateAdmin, serviceController.serviceUpdate);
router.post('/admin/service-category/list', request_param.any(), Authentication.AuthenticateAdmin, serviceController.serviceCatergories);

module.exports = router;