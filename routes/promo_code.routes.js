const express = require('express');
const promocodeController = require('../controllers/promo_code.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/promo_code/add', request_param.any(), Authentication.AuthenticateAdmin, promocodeController.add);
router.post('/promo_code/list', request_param.any(), Authentication.AuthenticateAdmin, promocodeController.list);

module.exports = router;