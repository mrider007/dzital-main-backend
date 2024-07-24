const express = require('express');
const router = express.Router();
const ConnectionController = require('../controllers/connection.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();

router.post('/connection-request/send', request_param.any(), Authentication.Authenticate, ConnectionController.sendConnectionRequest);
router.post('/connection-request/approve/reject/:id', request_param.any(), Authentication.Authenticate, ConnectionController.connectionRequestApproveReject);
router.post('/user/connections/list', request_param.any(), Authentication.Authenticate, ConnectionController.userConnectionsList);

module.exports = router;