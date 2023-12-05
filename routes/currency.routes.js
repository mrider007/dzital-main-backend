const express = require('express');
const currencyController = require('../controllers/currency.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/currency/list', request_param.any(), Authentication.AuthenticateAdmin, currencyController.list);
router.post('/currency/add', request_param.any(), Authentication.AuthenticateAdmin, currencyController.add);

module.exports = router;