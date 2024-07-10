const express = require('express');
const router = express.Router();
const Authentication = require('../middleware/authentication');
const PaymentDue = require('../controllers/payment_due.controller');

router.post('/users/payment/list', Authentication.AuthenticateAdmin, PaymentDue.getAll);
router.put('/users/payment/update/:id', Authentication.AuthenticateAdmin, PaymentDue.update);

module.exports = router