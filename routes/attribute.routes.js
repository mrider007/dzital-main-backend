const express = require('express');
const attributeController = require('../controllers/attribute.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/admin/attribute/detail/:id', Authentication.AuthenticateAdmin, attributeController.attributeDetails);
router.get('/admin/attribute/delete/:id', Authentication.AuthenticateAdmin, attributeController.delete);
router.post('/attribute/add', request_param.any(), Authentication.AuthenticateAdmin, attributeController.attributeAdd);
router.post('/admin/attribute/list', request_param.any(), Authentication.AuthenticateAdmin, attributeController.attributeList);
router.post('/admin/attribute/update/:id', request_param.any(), Authentication.AuthenticateAdmin, attributeController.update);
router.get('/attribute/bulk/update', attributeController.bulkUpdate);
router.post('/attribute/list', request_param.any(), Authentication.Authenticate, attributeController.userAttributeList);

module.exports = router;