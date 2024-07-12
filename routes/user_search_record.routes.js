const express = require('express');
const router = express.Router();
const UserSearchRecordController = require('../controllers/user_search_record.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();

router.post('/user/product/search/record', request_param.any(), Authentication.Authenticate, UserSearchRecordController.saveUserSearchRecord);
router.post('/user/search/record/list', request_param.any(), Authentication.Authenticate, UserSearchRecordController.userSearchRecordList);

module.exports = router;