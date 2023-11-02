const express = require('express');
const MembershipPlanController = require('../controllers/membership_plan.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/membership/plan/list', request_param.any(), Authentication.Authenticate, MembershipPlanController.planList);
router.get('/membership/plan/details/:id', Authentication.Authenticate, MembershipPlanController.planDetails);
router.get('/membership/plan/delete/:id', Authentication.Authenticate, MembershipPlanController.planDelete);
router.post('/membership/plan/add', request_param.any(), Authentication.Authenticate, MembershipPlanController.createPlan);
router.post('/membership/plan/update/:id', request_param.any(), Authentication.Authenticate, MembershipPlanController.planUpdate);

module.exports = router;