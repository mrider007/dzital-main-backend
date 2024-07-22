const express = require('express');
const router = express.Router();
const Authentication = require('../middleware/authentication');
const TransactionController = require('../controllers/transaction.controller');

router.post('/transaction/list', Authentication.AuthenticateAdmin, TransactionController.getAll);
router.post('/seller/transaction/list', Authentication.Authenticate, TransactionController.getAll);
router.post('/transaction/debit/entry', Authentication.AuthenticateAdmin, TransactionController.debit_entry);

module.exports = router