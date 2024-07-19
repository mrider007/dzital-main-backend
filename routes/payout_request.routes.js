const express = require('express');
const router = express.Router()
const Authentication = require('../middleware/authentication');
const PayoutRequestController = require('../controllers/payout_request.controller');
const multer = require('multer');
const request_params = multer();

router.post('/payout-request/create', request_params.any(), Authentication.Authenticate, PayoutRequestController.new_request);
router.put('/payout-request/update/:id', request_params.any(), Authentication.AuthenticateAdmin, PayoutRequestController.update_request);
router.post('/payout-request/list', request_params.any(), Authentication.AuthenticateAdmin, PayoutRequestController.get_all_requests);

module.exports = router;