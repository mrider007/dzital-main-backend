const express = require('express');
const MembershipPlanController = require('../controllers/membership_plan.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/membership/plan/list', request_param.any(), Authentication.AuthenticateAdmin, MembershipPlanController.planList);
router.get('/membership/plan/details/:id', Authentication.AuthenticateAdmin, MembershipPlanController.planDetails);
router.get('/membership/plan/delete/:id', Authentication.AuthenticateAdmin, MembershipPlanController.planDelete);
router.post('/membership/plan/add', request_param.any(), Authentication.AuthenticateAdmin, MembershipPlanController.createPlan);
router.post('/membership/plan/update/:id', request_param.any(), Authentication.AuthenticateAdmin, MembershipPlanController.planUpdate);

module.exports = router;