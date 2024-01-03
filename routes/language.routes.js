const express = require('express');
const languageController = require('../controllers/language.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/language/details/:id', Authentication.AuthenticateAdmin, languageController.details);
router.post('/language/add', request_param.any(), Authentication.AuthenticateAdmin, languageController.add);
router.post('/language/list', request_param.any(), Authentication.AuthenticateAdmin, languageController.list);
router.post('/language/update/:id', request_param.any(), Authentication.AuthenticateAdmin, languageController.update);
router.get('/language/delete/:id', request_param.any(), Authentication.AuthenticateAdmin, languageController.delete);

module.exports = router;