const express = require('express');
const promocodeController = require('../controllers/promo_code.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/admin/promo_code/details/:id', Authentication.AuthenticateAdmin, promocodeController.details);
router.post('/admin/promo_code/add', request_param.any(), Authentication.AuthenticateAdmin, promocodeController.add);
router.post('/admin/promo_code/list', request_param.any(), Authentication.AuthenticateAdmin, promocodeController.list);

module.exports = router;