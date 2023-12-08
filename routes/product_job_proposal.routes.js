const express = require('express');
const JobProposalController = require('../controllers/product_job_proposal.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/job/proposal/details/:id', request_param.any(), Authentication.Authenticate, JobProposalController.jobProposalDetails);
router.get('/job/proposal/delete/:id', request_param.any(), Authentication.Authenticate, JobProposalController.jobProposalDelete);
router.post('/job/proposal/add', request_param.any(), Authentication.Authenticate, JobProposalController.addJobProposal);
router.post('/job/proposal/list', request_param.any(), Authentication.Authenticate, JobProposalController.jobProposalList);
router.post('/job/proposal/update/:id', request_param.any(), Authentication.Authenticate, JobProposalController.jobProposalUpdate);
router.post('/job/proposal/status/update/:id', request_param.any(), Authentication.Authenticate, JobProposalController.jobProposalStatusUpdate);

module.exports = router;