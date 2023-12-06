const express = require('express');
const countryController = require('../controllers/country.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/country/add', request_param.any(), Authentication.AuthenticateAdmin, countryController.add);

module.exports = router;