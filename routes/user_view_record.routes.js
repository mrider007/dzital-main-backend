const express = require('express');
const router = express.Router();
const UserProductViewRecordController = require('../controllers/user_view_record.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();

router.post('/user/product/view/record', request_param.any(), Authentication.Authenticate, UserProductViewRecordController.saveUserProductViewRecord);
router.post('/user/product/view/list', request_param.any(), Authentication.Authenticate, UserProductViewRecordController.userProductViewRecordList);

module.exports = router;