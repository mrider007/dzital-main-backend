const express = require('express');
const Authentication = require('../middleware/authentication');
const StripePaymentController = require('../controllers/stripe_payment.controller')
const router = express.Router()

router.post('/payment/session/create', Authentication.Authenticate, StripePaymentController.create_payment)
router.post('/checkout/session/create', Authentication.Authenticate, StripePaymentController.checkout_payment)
router.post('/subscription/session/create', Authentication.Authenticate, StripePaymentController.subscribe_payment)
router.post('/membership/session/create', Authentication.Authenticate, StripePaymentController.membership_payment)
router.post('/subscription/session/verify', StripePaymentController.verify_payment)
router.post('/membership/session/verify', StripePaymentController.membership_payment_verfication)

module.exports = router;