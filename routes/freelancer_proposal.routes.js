const express = require('express');
const router = express.Router();
const freelancerProposalController = require('../controllers/freelancer_proposal.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();

router.post('/freelancer/proposal', request_param.any(), Authentication.Authenticate, freelancerProposalController.freelancerProposalPost);

module.exports = router;