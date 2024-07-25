const express = require('express');
const router = express.Router();
const ConnectionController = require('../controllers/connection.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();

router.get('/user/connection/request/withdraw/:id', request_param.any(), Authentication.Authenticate, ConnectionController.withdrawRequests);
router.post('/connection-request/send', request_param.any(), Authentication.Authenticate, ConnectionController.sendConnectionRequest);
router.post('/connection-request/approve/reject/:id', request_param.any(), Authentication.Authenticate, ConnectionController.connectionRequestApproveReject);
router.post('/user/connections/list', request_param.any(), Authentication.Authenticate, ConnectionController.userConnectionsList);
router.post('/user/pending/requests/list', request_param.any(), Authentication.Authenticate, ConnectionController.userPendingRequestsList);
router.post('/search/connections', request_param.any(), Authentication.Authenticate, ConnectionController.searchConnections);
router.post('/user/send/requests/list', request_param.any(), Authentication.Authenticate, ConnectionController.userSendRequestsList);

module.exports = router;