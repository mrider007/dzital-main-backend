const express = require('express');
const JobProposalController = require('../controllers/product_job_proposal.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/job/proposal/details/:id', request_param.any(), JobProposalController.jobProposalDetails);
router.get('/job/proposal/delete/:id', request_param.any(), JobProposalController.jobProposalDelete);
router.post('/job/proposal/add', request_param.any(), JobProposalController.addJobProposal);
router.post('/job/proposal/list', request_param.any(), JobProposalController.jobProposalList);
router.post('/job/proposal/update/:id', request_param.any(), JobProposalController.jobProposalUpdate);
router.post('/job/proposal/status/update/:id', request_param.any(), JobProposalController.jobProposalStatusUpdate);

module.exports = router;