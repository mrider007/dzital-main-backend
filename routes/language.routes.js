const express = require('express');
const languageController = require('../controllers/language.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/language/add', request_param.any(), Authentication.AuthenticateAdmin, languageController.add);

module.exports = router;