const express = require('express');
const Authentication = require('../middleware/authentication');
const SubscriptionUserController = require('../controllers/subscription_user.controller');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/user/free/subscription/create', request_param.any(), Authentication.Authenticate, SubscriptionUserController.create_free);
router.post('/user/subscription/list', Authentication.Authenticate, SubscriptionUserController.getAllSubsription);
router.put('/user/subsription/cancel/:id', Authentication.Authenticate, SubscriptionUserController.pause_subscription);
router.put('/user/subsription/resume/:id', Authentication.Authenticate, SubscriptionUserController.resume_subscription);
router.get('/user/subsription/detail/:id', Authentication.Authenticate, SubscriptionUserController.getSubscriptionDetails);

module.exports = router;