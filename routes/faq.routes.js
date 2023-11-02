const express = require('express');
const faqController = require('../controllers/faq.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/faq/details/:id', Authentication.AuthenticateAdmin, faqController.faqDetails);
router.post('/faq/add', request_param.any(), Authentication.AuthenticateAdmin, faqController.faqAdd);
router.post('/faq/list', request_param.any(), Authentication.AuthenticateAdmin, faqController.faqList);
router.post('/faq/update/:id', request_param.any(), Authentication.AuthenticateAdmin, faqController.faqUpdate);

module.exports = router;