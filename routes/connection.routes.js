const express = require('express');
const router = express.Router();
const ConnectionController = require('../controllers/connection.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();

router.post('/connection-request/send', request_param.any(), Authentication.Authenticate, ConnectionController.sendConnectionRequest);

module.exports = router;