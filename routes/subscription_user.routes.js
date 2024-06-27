const express = require('express');
const Authentication = require('../middleware/authentication');
const SubscriptionUserController = require('../controllers/subscription_user.controller');
const multer = require('multer');
const router = express.Router()
const request_param = multer();

router.post('/user/free/subscription/create',request_param.any(), Authentication.Authenticate, SubscriptionUserController.create_free);
router.post('/user/subscription/list', Authentication.Authenticate, SubscriptionUserController.getAllSubsription);
router.post('/subscribed/users', Authentication.Authenticate, SubscriptionUserController.getSubscribedUser);
router.put('/user/subsription/pause/:id', Authentication.Authenticate, SubscriptionUserController.pause_subscription)
router.put('/user/subsription/cancel/:id', Authentication.Authenticate, SubscriptionUserController.cancel_subscription)
router.put('/user/subsription/resume/:id', Authentication.Authenticate, SubscriptionUserController.resume_subscription)
router.get('/user/subsription/detail/:id', Authentication.Authenticate, SubscriptionUserController.getSubscriptionDetails)

module.exports = router;