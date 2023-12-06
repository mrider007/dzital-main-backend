const express = require('express');
const countryController = require('../controllers/country.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/country/details/:id', Authentication.AuthenticateAdmin, countryController.details);
router.post('/country/add', request_param.any(), Authentication.AuthenticateAdmin, countryController.add);
router.post('/country/list', request_param.any(), Authentication.AuthenticateAdmin, countryController.list);

module.exports = router;