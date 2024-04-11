const express = require('express');
const router = express.Router();
const multer = require('multer');
const Authentication = require('../middleware/authentication');
const bid_historyController = require('../controllers/bid_history.controller');
const request_param = multer();

router.post('/product/bid/add', Authentication.Authenticate, request_param.any(), bid_historyController.bidAdd);
router.post('/product/bid/list', Authentication.Authenticate, bid_historyController.bidlist)

module.exports = router;