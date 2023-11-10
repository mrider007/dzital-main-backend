const express = require('express');
const cmsController = require('../controllers/cms.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/cms/getAll', request_param.any(), cmsController.getAllCms);
router.get('/cms/delete/:id', Authentication.AuthenticateAdmin, cmsController.cmsDelete);
router.get('/cms/detail/:id', Authentication.AuthenticateAdmin, cmsController.getDetails);
router.get('/cms/status-change/:id', Authentication.AuthenticateAdmin, cmsController.changeStatus);
router.post('/cms/details', request_param.any(), Authentication.Authenticate, cmsController.cmsDetails);
router.post('/cms/add', request_param.any(), Authentication.AuthenticateAdmin, cmsController.cmsAdd);
router.post('/cms/update/:id', Authentication.AuthenticateAdmin, cmsController.cmsUpdate);
router.post('/cms/list', request_param.any(), Authentication.AuthenticateAdmin, cmsController.cmsList);

module.exports = router;