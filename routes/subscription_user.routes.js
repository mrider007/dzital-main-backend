const express = require('express');
const Authentication = require('../middleware/authentication');
const SubscriptionUserController = require('../controllers/subscription_user.controller');
const router = express.Router()

router.post('/user/subscription/list', Authentication.Authenticate, SubscriptionUserController.getAllSubsription);

module.exports = router;