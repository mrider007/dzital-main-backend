const express = require('express');
const router = express.Router();
const promocodeController = require('../controllers/promo_code.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();

router.get('/promocode/details/:id', Authentication.AuthenticateAdmin, promocodeController.promocodeDetails);
router.get('/promocode/delete/:id', Authentication.AuthenticateAdmin, promocodeController.promocodeDelete);
router.get('/promocode/list', Authentication.Authenticate, promocodeController.Promocodes);
router.post('/promocode/add', request_param.any(), Authentication.AuthenticateAdmin, promocodeController.promocodeAdd);
router.post('/promocode/update/:id', request_param.any(), Authentication.AuthenticateAdmin, promocodeController.promocodeUpdate);
router.post('/promocode/list', Authentication.AuthenticateAdmin, promocodeController.promocodeList);
router.post('/promocode/status/update/:id', request_param.any(), Authentication.AuthenticateAdmin, promocodeController.statusChange);

module.exports = router;